const { QuizHistory, Year } = require("../models/school.model");
const { Quiz } = require("../models/courses.model");

const { Sequelize } = require("sequelize");

const getCurrentYear = async () => {
  const currentYear = await Year.findOne({
    where: {
      IsCurrent: true,
    },
  });

  if (!currentYear) {
    throw new Error("Current year not configured.");
  }

  return currentYear;
};

const startQuiz = async (req, res) => {
  const {
    Std_Code,
    Course_Id,
    Lesson_Name,
    Quiz_Id,
    Quiz_Title,
    Grade_Id,
    Subject_Id,
    Term_Id,
    Total_Questions,
  } = req.body;

  if (
    !Std_Code ||
    Course_Id == null ||
    Quiz_Id == null ||
    Grade_Id == null ||
    Subject_Id == null ||
    Term_Id == null ||
    Total_Questions == null
  ) {
    return res.status(400).json({
      message: "Missing data.",
    });
  }

  try {
    // السنة الحالية
    const currentYear = await getCurrentYear();

    // بدء الإجراء المخزن
    const [result] = await QuizHistory.sequelize.query(
      `
                EXEC SP_GetOrCreate_Quiz_Attempt
                    @Year_Id=:Year_Id,
                    @Std_Code=:Std_Code,
                    @Lesson_Name=:Lesson_Name,
                    @Course_Id=:Course_Id,
                    @Quiz_Id=:Quiz_Id,
                    @Grade_Id=:Grade_Id,
                    @Subject_Id=:Subject_Id,
                    @Term_Id=:Term_Id,
                    @Quiz_Title=:Quiz_Title,
                    @Total_Questions=:Total_Questions
                `,
      {
        replacements: {
          Year_Id: currentYear.Year_Id,
          Std_Code,
          Lesson_Name,
          Course_Id,
          Quiz_Id,
          Grade_Id,
          Subject_Id,
          Term_Id,
          Quiz_Title,
          Total_Questions,
        },
      },
    );

    return res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateQuizHistory = async (req, res) => {
  const { id } = req.params;

  const { Answered_Questions, Correct_Answers } = req.body;

  if (Answered_Questions == null || Correct_Answers == null) {
    return res.status(400).json({
      message: "Missing progress data.",
    });
  }

  if (!id) {
    return res.status(400).json({
      message: "History id is required.",
    });
  }

  try {
    const history = await QuizHistory.findByPk(id);

    if (!history) {
      return res.status(404).json({
        message: "Quiz history not found.",
      });
    }

    if (history.Finished_At) {
      return res.status(400).json({
        message: "Quiz attempt already finished.",
      });
    }

    await history.update({
      Answered_Questions,
      Correct_Answers,
    });

    return res.status(200).json({
      message: "Quiz progress updated.",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

const finishQuizHistory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "History id is required.",
    });
  }
  try {
    const history = await QuizHistory.findByPk(id);

    if (!history) {
      return res.status(404).json({
        message: "Quiz history not found.",
      });
    }

    if (history.Finished_At) {
      return res.status(200).json({
        message: "Quiz already finished.",
      });
    }

    await history.update({
      Finished_At: new Date(),
    });

    return res.status(200).json({
      message: "Quiz finished.",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

const getLastQuizHistory = async (req, res) => {
  const { stdCode, termId, subjectId } = req.params;

  if (!stdCode || !termId || !subjectId) {
    return res.status(400).json({
      message: "Student, term and subject are required.",
    });
  }

  try {
    const currentYear = await getCurrentYear();

    const history = await QuizHistory.findOne({
      where: {
        Year_Id: currentYear.Year_Id,
        Std_Code: stdCode,
        Term_Id: termId,
        Subject_Id: subjectId,
      },
      order: [["Started_At", "DESC"]],
    });

    if (!history) {
      return res.status(200).json(null);
    }

    return res.status(200).json(history);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

const getFinishedQuizzesCount = async (req, res) => {
  const { stdCode, courseId, termId, subjectId } = req.params;

  if (!stdCode || !courseId || !termId || !subjectId) {
    return res.status(400).json({
      message: "Student, course, term and subject are required.",
    });
  }

  try {
    const currentYear = await getCurrentYear();

    const [result] = await QuizHistory.sequelize.query(
      `
            SELECT COUNT(DISTINCT Quiz_Id) AS Finished_Quizzes
            FROM Student_Quiz_History
            WHERE Year_Id = :Year_Id
                AND Std_Code = :Std_Code
                AND Course_Id = :Course_Id
                AND Term_Id = :Term_Id
                AND Subject_Id = :Subject_Id
                AND Finished_At IS NOT NULL
                AND Quiz_Id IS NOT NULL
            `,
      {
        replacements: {
          Year_Id: currentYear.Year_Id,
          Std_Code: stdCode,
          Course_Id: courseId,
          Term_Id: termId,
          Subject_Id: subjectId,
        },
      },
    );

    return res.status(200).json({
      count: Number(result[0].Finished_Quizzes),
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

const getStudentSubjectProgress = async (req, res) => {
  const { stdCode, gradeId, termId, subjectId } = req.params;

  if (!stdCode || !gradeId || !termId || !subjectId) {
    return res.status(400).json({
      message: "Student, grade, term and subject are required.",
    });
  }

  try {
    const currentYear = await getCurrentYear();

    // =========================================================
    // 1. جلب كل الكويزات + آخر محاولة منتهية للطالب
    //
    // مفتاح الكويز الكامل:
    // Quiz_Id + Course_Id + Grade_Id + Subject_Id + Term_Id
    //
    // الطالب ليس جزءًا من مفتاح الكويز،
    // وإنما يستخدم لتحديد محاولاته.
    // =========================================================

    const [result] = await QuizHistory.sequelize.query(
      `
      WITH FinishedAttempts AS (
          SELECT
              h.Id,
              h.Quiz_Id,
              h.Course_Id,
              h.Grade_Id,
              h.Subject_Id,
              h.Term_Id,
              h.Total_Questions,
              h.Answered_Questions,
              h.Correct_Answers,
              h.Finished_At,

              ROW_NUMBER() OVER (
                  PARTITION BY
                      h.Quiz_Id,
                      h.Course_Id,
                      h.Grade_Id,
                      h.Subject_Id,
                      h.Term_Id
                  ORDER BY
                      h.Finished_At DESC,
                      h.Id DESC
              ) AS rn

          FROM Student_Quiz_History h

          WHERE h.Year_Id = :Year_Id
              AND h.Std_Code = :Std_Code
              AND h.Grade_Id = :Grade_Id
              AND h.Subject_Id = :Subject_Id
              AND h.Term_Id = :Term_Id
              AND h.Finished_At IS NOT NULL
              AND h.Quiz_Id IS NOT NULL
              AND h.Course_Id IS NOT NULL
      ),

      LastFinishedAttempts AS (
          SELECT *
          FROM FinishedAttempts
          WHERE rn = 1
      )

      SELECT
          t.topic_id,
          t.title AS topic_title,
          t.topic_sort_no,

          c.course_id,
          c.title AS course_title,
          c.course_sort_no,

          q.quiz_id,
          q.quiz_title,

          CASE
              WHEN lfa.Id IS NOT NULL
              THEN 1
              ELSE 0
          END AS Is_Finished,

          CASE
              WHEN lfa.Id IS NOT NULL
              THEN lfa.Total_Questions
              ELSE 0
          END AS Total_Questions,

          CASE
              WHEN lfa.Id IS NOT NULL
              THEN lfa.Answered_Questions
              ELSE 0
          END AS Answered_Questions,

          CASE
              WHEN lfa.Id IS NOT NULL
              THEN lfa.Correct_Answers
              ELSE 0
          END AS Correct_Answers,

          CASE
              WHEN lfa.Id IS NOT NULL
                   AND lfa.Total_Questions > 0
              THEN
                  ROUND(
                      CAST(lfa.Correct_Answers AS FLOAT)
                      / lfa.Total_Questions
                      * 100,
                      0
                  )
              ELSE 0
          END AS Score

      FROM topics t

      INNER JOIN courses c
          ON c.topic_id = t.topic_id
          AND c.grade_id = :Grade_Id
          AND c.term_id = :Term_Id
          AND c.subject_id = :Subject_Id
          AND c.active = 1

      INNER JOIN quizzes q
          ON q.course_id = c.course_id
          AND q.grade_id = c.grade_id
          AND q.term_id = c.term_id
          AND q.subject_id = c.subject_id
          AND q.active = 1

      LEFT JOIN LastFinishedAttempts lfa
          ON lfa.Quiz_Id = q.quiz_id
          AND lfa.Course_Id = q.course_id
          AND lfa.Grade_Id = q.grade_id
          AND lfa.Subject_Id = q.subject_id
          AND lfa.Term_Id = q.term_id

      WHERE t.grade_id = :Grade_Id
          AND t.term_id = :Term_Id
          AND t.subject_id = :Subject_Id
          AND t.active = 1

      ORDER BY
          t.topic_sort_no ASC,
          c.course_sort_no ASC,
          q.quiz_id ASC
      `,
      {
        replacements: {
          Year_Id: currentYear.Year_Id,
          Std_Code: stdCode,
          Grade_Id: gradeId,
          Term_Id: termId,
          Subject_Id: subjectId,
        },
      },
    );

    // =========================================================
    // 2. تجميع البيانات
    // =========================================================

    const topicsMap = new Map();

    let totalQuizzes = 0;
    let finishedQuizzes = 0;

    let totalFinishedQuestions = 0;
    let totalCorrectAnswers = 0;

    // =========================================================
    // 3. بناء Topics -> Courses -> Quizzes
    // =========================================================

    for (const row of result) {
      const topicId = row.topic_id;
      const courseId = row.course_id;

      const isFinished = Number(row.Is_Finished) === 1;

      const totalQuestions = Number(row.Total_Questions) || 0;
      const answeredQuestions = Number(row.Answered_Questions) || 0;
      const correctAnswers = Number(row.Correct_Answers) || 0;

      // =======================================================
      // إنشاء الوحدة
      // =======================================================

      if (!topicsMap.has(topicId)) {
        topicsMap.set(topicId, {
          topic_id: topicId,
          title: row.topic_title,

          totalQuizzes: 0,
          finishedQuizzes: 0,
          remainingQuizzes: 0,

          totalQuestions: 0,
          correctAnswers: 0,

          progress: 0,
          score: 0,

          courses: [],
        });
      }

      const topic = topicsMap.get(topicId);

      // =======================================================
      // البحث عن الدرس
      // =======================================================

      let course = topic.courses.find((item) => item.course_id === courseId);

      if (!course) {
        course = {
          course_id: courseId,

          totalQuizzes: 0,
          finishedQuizzes: 0,
          remainingQuizzes: 0,

          totalQuestions: 0,
          correctAnswers: 0,

          progress: 0,
          score: 0,

          quizzes: [],
        };

        topic.courses.push(course);
      }

      // =======================================================
      // بيانات الكويز
      // =======================================================

      const quiz = {
        quiz_id: row.quiz_id,
        quiz_title: row.quiz_title,

        finished: isFinished,

        totalQuestions: totalQuestions,
        answeredQuestions: answeredQuestions,
        correctAnswers: correctAnswers,

        score: Number(row.Score) || 0,
      };

      course.quizzes.push(quiz);

      // =======================================================
      // إجمالي الكويزات
      // =======================================================

      totalQuizzes++;

      topic.totalQuizzes++;
      course.totalQuizzes++;

      // =======================================================
      // المكتمل فقط يدخل في حساب الدرجات
      // =======================================================

      if (isFinished) {
        finishedQuizzes++;

        topic.finishedQuizzes++;
        course.finishedQuizzes++;

        // -----------------------------
        // الوحدة
        // -----------------------------

        topic.totalQuestions += totalQuestions;
        topic.correctAnswers += correctAnswers;

        // -----------------------------
        // الدرس
        // -----------------------------

        course.totalQuestions += totalQuestions;
        course.correctAnswers += correctAnswers;

        // -----------------------------
        // المادة
        // -----------------------------

        totalFinishedQuestions += totalQuestions;
        totalCorrectAnswers += correctAnswers;
      }
    }

    // =========================================================
    // 4. حساب الدروس والوحدات
    // =========================================================

    for (const topic of topicsMap.values()) {
      // =======================================================
      // الدروس
      // =======================================================

      for (const course of topic.courses) {
        course.remainingQuizzes = Math.max(
          course.totalQuizzes - course.finishedQuizzes,
          0,
        );

        // نسبة الإنجاز:
        // الكويزات المكتملة / إجمالي الكويزات

        course.progress =
          course.totalQuizzes > 0
            ? Math.round((course.finishedQuizzes / course.totalQuizzes) * 100)
            : 0;

        // الدرجة:
        // مجموع الصحيح / مجموع أسئلة الكويزات المكتملة

        course.score =
          course.totalQuestions > 0
            ? Math.round((course.correctAnswers / course.totalQuestions) * 100)
            : 0;
      }

      // =======================================================
      // الوحدة
      // =======================================================

      topic.remainingQuizzes = Math.max(
        topic.totalQuizzes - topic.finishedQuizzes,
        0,
      );

      // نسبة الإنجاز:
      // الكويزات المكتملة / إجمالي الكويزات

      topic.progress =
        topic.totalQuizzes > 0
          ? Math.round((topic.finishedQuizzes / topic.totalQuizzes) * 100)
          : 0;

      // الدرجة:
      // مجموع الصحيح في كل الكويزات المكتملة
      // /
      // مجموع أسئلة كل الكويزات المكتملة

      topic.score =
        topic.totalQuestions > 0
          ? Math.round((topic.correctAnswers / topic.totalQuestions) * 100)
          : 0;
    }

    // =========================================================
    // 5. النتيجة النهائية للمادة
    // =========================================================

    const remainingQuizzes = Math.max(totalQuizzes - finishedQuizzes, 0);

    // =========================================================
    // نسبة إنجاز المادة
    // =========================================================

    const progress =
      totalQuizzes > 0 ? Math.round((finishedQuizzes / totalQuizzes) * 100) : 0;

    // =========================================================
    // درجة المادة
    //
    // مجموع الإجابات الصحيحة
    // /
    // مجموع أسئلة الكويزات المكتملة
    // =========================================================

    const score =
      totalFinishedQuestions > 0
        ? Math.round((totalCorrectAnswers / totalFinishedQuestions) * 100)
        : 0;

    // =========================================================
    // 6. إخراج النتيجة
    // =========================================================

    return res.status(200).json({
      totalQuizzes,
      finishedQuizzes,
      remainingQuizzes,

      progress,
      score,

      topics: Array.from(topicsMap.values()),
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  startQuiz,
  updateQuizHistory,
  finishQuizHistory,
  getLastQuizHistory,
  getFinishedQuizzesCount,
  getStudentSubjectProgress,
};

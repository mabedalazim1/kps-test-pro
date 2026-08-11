const {
    QuizHistory,
    Year
} = require('../models/school.model');


const getCurrentYear = async () => {

    const currentYear = await Year.findOne({
        where: {
            IsCurrent: true
        }
    });

    if (!currentYear) {
        throw new Error("Current year not configured.");
    }

    return currentYear;
}

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
        Total_Questions
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
            message: "Missing data."
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
                    Total_Questions
                }
            }
        );

        return res.status(200).json(result[0]);


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};

const updateQuizHistory = async (req, res) => {

    const { id } = req.params;

    const {
        Answered_Questions,
        Correct_Answers
    } = req.body;

    if (
        Answered_Questions == null ||
        Correct_Answers == null
    ) {
        return res.status(400).json({
            message: "Missing progress data."
        });
    }

    if (!id) {
        return res.status(400).json({
            message: "History id is required."
        });
    }

    try {

        const history = await QuizHistory.findByPk(id);

        if (!history) {
            return res.status(404).json({
                message: "Quiz history not found."
            });
        }

        if (history.Finished_At) {
            return res.status(400).json({
                message: "Quiz attempt already finished."
            });
        }

        await history.update({

            Answered_Questions,
            Correct_Answers

        });

        return res.status(200).json({
            message: "Quiz progress updated."
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });

    }

};


const finishQuizHistory = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "History id is required."
        });
    }
    try {

        const history = await QuizHistory.findByPk(id);

        if (!history) {
            return res.status(404).json({
                message: "Quiz history not found."
            });
        }

        if (history.Finished_At) {
            return res.status(200).json({
                message: "Quiz already finished."
            });
        }

        await history.update({

            Finished_At: new Date()

        });

        return res.status(200).json({
            message: "Quiz finished."
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });

    }
};

const getLastQuizHistory = async (req, res) => {

        const {
        stdCode,
        termId,
        subjectId
    } = req.params;

    if (!stdCode || !termId || !subjectId) {
        return res.status(400).json({
            message: "Student, term and subject are required."
        });
    }


    try {

        const currentYear = await getCurrentYear();

        const history = await QuizHistory.findOne({
            where: {
                Year_Id: currentYear.Year_Id,
                Std_Code :stdCode,
                Term_Id: termId,
                Subject_Id: subjectId
            },
            order: [
                ["Started_At", "DESC"]
            ]
        });

        if (!history) {
            return res.status(200).json(null);
        }

        return res.status(200).json(history);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });

    }
};


module.exports = {
    startQuiz,
    updateQuizHistory,
    finishQuizHistory,
    getLastQuizHistory,
};
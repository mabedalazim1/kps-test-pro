const Sequelize = require('sequelize')

const { Question, Quiz, Answer } = require('./../models/courses.model');

const createQuestion = async (req, res, next) => {

    const { question_id, course_id, quiz_id, question_text, question_img,
        question_type, grade_id, subject_id, term_id
    } = req.body

    if (!question_id || !course_id || !quiz_id || !grade_id || !subject_id || !term_id || !question_text) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }
    try {
        const questionData =
        {
            question_id, course_id, quiz_id, question_text, question_img,
            question_type, grade_id, subject_id, term_id
        }
        const data = await Question.create(questionData)
        return res.status(201).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Can't add Tith Question.!" })
    }
}

const getQuestionsByQuiz = async (req, res, next) => {
    const { quizId, courseId, gredId, subjectId, termId } = req.params
    try {
        const data = await Quiz.findOne({
            where: {
                course_id: courseId,
                quiz_id: quizId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId,
            },
            include: [
                {
                    model: Question,
                    where: {
                        course_id: courseId,
                        quiz_id: quizId,
                        grade_id: gredId,
                        subject_id: subjectId,
                        term_id: termId,
                    },
                    required: false,
                },
            ],


        })
        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    } catch (err) {
        res.status(500).json({ message: err })
        console.log(err)
    }
}

const deleteQuestion = async (req, res, next) => {
    const { questionId, courseId, quizId, gradeId, subjectId, termId } = req.params
    try {
        const data = await Question.findOne({
            where: {
                question_id: questionId,
                course_id: courseId,
                quiz_id: quizId,
                grade_id: gradeId,
                subject_id: subjectId,
                term_id: termId,
            }
        })

        if (!data) {
            res.status(200).send({ message: "Question was not found.. !" })
        } else {
            await data.destroy()
            await Answer.destroy({
                where: {
                    question_id: questionId,
                    quiz_id: quizId,
                    grade_id: gradeId,
                    subject_id: subjectId,
                    term_id: termId,
                }
            })
            res.status(200).send({ message: "Question was delete successfully.", question_id: questionId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const updateQuestion = async (req, res, next) => {
    const { questionId, courseId, quizId, gradeId, subjectId, termId } = req.params
    try {

        const data = await Question.update(req.body, {
            where: {
                question_id: questionId,
                course_id: courseId,
                quiz_id: quizId,
                grade_id: gradeId,
                subject_id: subjectId,
                term_id: termId,
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Question was updated successfully.", question_id: questionId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const getNewQuestionId = async (req, res, next) => {
    const {courseId, quizId, gradeId, subjectId, termId } = req.params
    try {
        const data = await Question.findAll({
            where: {
                course_id: courseId,
                quiz_id: quizId,
                grade_id: gradeId,
                subject_id: subjectId,
                term_id: termId,

            },
            attributes: [[Sequelize.fn('max', Sequelize.col('question_id')), 'id']],
            raw: true,

        })
        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data[0])
        }
    } catch (err) {
        res.status(500).json({ message: err })
        console.log(err)
    }
}

module.exports = {
    createQuestion,
    getQuestionsByQuiz,
    deleteQuestion,
    updateQuestion,
    getNewQuestionId,
}
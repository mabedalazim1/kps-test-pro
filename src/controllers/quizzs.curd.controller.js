const Sequelize = require('sequelize')

const { Course, Quiz, Question, Answer } = require('./../models/courses.model');

const createQuiz = async (req, res, next) => {

    const { quiz_id, quiz_title, course_id, quiz_description, active,
        time_limit, degree, grade_id, subject_id, term_id, sound, quizType
    } = req.body

    if (!quiz_id || !course_id || !grade_id || !subject_id
        || !term_id || !quiz_title || !quiz_description || !quizType || !degree || !active) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }

    try {
        const quizData =
        {
            quiz_id, quiz_title, course_id, quiz_description, active,
            time_limit, degree, grade_id, subject_id, term_id, sound, quizType
        }
        const data = await Quiz.create(quizData)
        return res.status(201).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Can't add Tith Quiz.!" })
    }
}

const getQuizzesByGrade = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Course.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId,
            },
            include: [
                {
                    model: Quiz,
                    where: {
                        grade_id: gredId,
                        subject_id: subjectId,
                    },
                    required: true,
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


const deleteQuiz = async (req, res, next) => {
    const { quizId, courseId, gradeId, subjectId, termId } = req.params
    try {
        const data = await Quiz.findOne({
            where: {
                quiz_id: quizId,
                course_id: courseId,
                grade_id: gradeId,
                subject_id: subjectId,
                term_id: termId,
            }
        })
        if (!data) {
            res.status(200).send({ message: "Quiz was not found.. !" })
        } else {

            const questionData = await Question.findAll({
                where: {
                    quiz_id: quizId,
                    course_id: courseId,
                    grade_id: gradeId,
                    subject_id: subjectId,
                    term_id: termId,
                }
            })

            await data.destroy()

            if(questionData.length > 0){
                for (let i = 0; i < questionData.length; i++) {
                    const questionId = questionData[i].question_id
                    console.log(questionId)
                  await  Answer.destroy({
                        where:{
                            question_id:questionId,
                            quiz_id: quizId,
                            grade_id: gradeId,
                            subject_id: subjectId,
                            term_id: termId,
                        }
                    })
                  }
               
                await Question.destroy({
                    where: {
                        quiz_id: quizId,
                        course_id: courseId,
                        grade_id: gradeId,
                        subject_id: subjectId,
                        term_id: termId,
                    }
                })
            }
            
            res.status(200).send({ message: "Quiz was delete successfully.", quiz_id: quizId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const updateQuiz = async (req, res, next) => {
    const { quizId, courseId, gradeId, subjectId, termId } = req.params
    try {

        const data = await Quiz.update(req.body, {
            where: {
                quiz_id: quizId,
                course_id: courseId,
                grade_id: gradeId,
                subject_id: subjectId,
                term_id: termId,
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Quiz was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}


const getNewQuzeId = async (req, res, next) => {
    const { couresId, gredId, subjectId, termId } = req.params
    try {
        const data = await Quiz.findAll({
            where: {
                course_id: couresId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId,
            },
            attributes: [[Sequelize.fn('max', Sequelize.col('quiz_id')), 'id']],
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
    createQuiz,
    getQuizzesByGrade,
    deleteQuiz,
    updateQuiz,
    getNewQuzeId,
}
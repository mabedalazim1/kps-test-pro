const { Question, Answer } = require('./../models/courses.model');

const getAnswersByGrade = async (req, res, next) => {
    const { questionId,courseId, quizId, gradeId, subjectId, termId } = req.params
    try {
        const data = await Answer.findAll({
            where: {
                course_id: courseId,
                question_id: questionId,
                quiz_id: quizId,
                grade_id: gradeId,
                subject_id: subjectId,
                term_id: termId,
            },
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

const deleteAnswer = async (req, res, next) => {
    const { answerId } = req.params
    try {
        const data = await Answer.findOne({
            where: {
                answer_id: answerId
            }
        })
        if (!data) {
            res.status(200).send({ message: "Answer was not found.. !" })
        } else {
            await data.destroy()
            res.status(200).send({ message: "Answer was delete successfully.", answer_id: answerId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const createAnswer = async (req, res, next) => {

    const { course_id, quiz_id, question_id,
        answer_text, is_correct, grade_id, subject_id, term_id
    } = req.body
if (!course_id ||!quiz_id || !grade_id || !subject_id || !term_id || !answer_text) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }
    try {
        const answerData =
        {
            course_id, quiz_id, question_id, answer_text,
            is_correct, grade_id, subject_id, term_id
        }
        const data = await Answer.create(answerData)
        return res.status(201).json({data, message: " The Ansewer Was added Successfully.!"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Can't add Tith Answer.!" })
    }
}
const updateAnswer = async (req, res, next) => {
    const { answerId } = req.params
    const { answer_text, is_correct} = req.body 
    
if (!is_correct || !answer_text) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }

    try {

        const data = await Answer.update(req.body, {
            where: {
               answer_id: answerId
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Answer was updated successfully." ,  answer_id: answerId})
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

module.exports = {
    getAnswersByGrade,
    deleteAnswer,
    createAnswer,
    updateAnswer,
}
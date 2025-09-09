const { Op } = require('sequelize')
const Sequelize = require('sequelize')

const {
    Topic, Course, Question, Quiz, Answer, Grade, Subject,
    Term, Subpart, Review, Vocabulary, QuizType
} = require('./../models/courses.model');

const createTopic = async (req, res, next) => {
    const { topic_id, grade_id, subject_id, term_id,
        title, description, lang, topic_sort_no } = req.body
    if (!topic_id || !grade_id || !subject_id || !term_id || !title || !description) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }
    try {
        const topic =
        {
            topic_id,
            title,
            description,
            lang,
            topic_sort_no,
            grade_id,
            subject_id,
            term_id,
        }
        const data = await Topic.create(topic)
        return res.status(201).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Can't add Tith Topic.!" })
    }
}

const updateTopic = async (req, res, next) => {
    const { topicId, gredId, subjectId, termId } = req.params
    try {

        const data = await Topic.update(req.body, {
            where: {
                topic_id: topicId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId
            }
        })
        console.log("Mohamed")
        console.log(topicId, gredId, subjectId, termId)
        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Topic was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        //console.log("Error", err)
        console.log("afrfwerrtertettet")
        console.log(topicId, gredId, subjectId, termId)
    }
}

const deleteTopic = async (req, res, next) => {
    const { topicId, gredId, subjectId, termId } = req.params
    try {
        const data = await Topic.findOne({
            where: {
                topic_id: topicId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId
            }
        })
        if (!data) {
            return res.status(404).send({ message: "Topic was not found.. !" })
        }

        const coursesCount = await Course.count({
            where: {
                topic_id: topicId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId,
            },
        })

        if (coursesCount > 0) {
            return res.status(400).send({
                message: "لا يمكن حذف التوبيك، يوجد دروس مرتبطة به. احذف الدروس أولاً.",
            })
        }

        await data.destroy()
        return res.status(200).send({
            message: "Topic was deleted successfully.",
            topic_id: topicId,
        })
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}


module.exports = {
    updateTopic,
    deleteTopic,
    createTopic,
}
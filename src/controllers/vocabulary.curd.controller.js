const { Op } = require('sequelize')
const Sequelize = require('sequelize')

const {
    Topic, Course, Question, Quiz, Answer, Grade, Subject,
    Term, Subpart, Review, Vocabulary, QuizType
} = require('./../models/courses.model');

const getVocabularyByGrade = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Course.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId,
            },
            include: [
                {
                    model: Vocabulary,
                    where: {
                        grade_id: gredId,
                        subject_id: subjectId,
                    },
                    attributes: ['vocabulary_Id', 'course_id', 'vocabulary', 'vocabulary_text', 'vocabulary_kind', 'grade_id', 'subject_id', 'term_id', 'sound'],
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

const createVocabulary = async (req, res, next) => {

    const {  course_id, vocabulary, vocabulary_text,
        vocabulary_kind, grade_id, subject_id, term_id, sound
    } = req.body

    if ( !course_id || !grade_id || !subject_id
        || !term_id || !vocabulary || !vocabulary_text) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }

    try {
        const vocabularyData =
        {
            course_id,
            vocabulary:vocabulary,
            vocabulary_text,
            vocabulary_kind,
            grade_id,
            subject_id,
            term_id,
            sound,
        }
        const data = await Vocabulary.create(vocabularyData)
        return res.status(201).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Can't add Tith Vocabulary.!" })
    }
}

const updateVocabulary = async (req, res, next) => {
    const { vocabularyId } = req.params
    try {

        const data = await Vocabulary.update(req.body, {
            where: {
                vocabulary_Id:vocabularyId,
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Vocabulary was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const deleteVocabulary = async (req, res, next) => {
    const { vocabularyId } = req.params
    try {
        const data = await Vocabulary.findOne({
            where: {
                vocabulary_Id: vocabularyId,
            }
        })
        if (!data) {
            res.status(200).send({ message: "Vocabulary was not found.. !" })
        } else {
            await data.destroy()
            res.status(200).send({ message: "Vocabulary was delete successfully.", vocabulary_Id: vocabularyId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

module.exports = {
    getVocabularyByGrade,
    deleteVocabulary,
    createVocabulary,
    updateVocabulary,
}
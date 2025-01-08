
const { Op } = require('sequelize')
const Sequelize = require('sequelize')

const {
    Topic, Course, Question, Quiz, Answer, Grade, Subject,
    Term, Subpart, Review, Vocabulary, QuizType
} = require('./../models/courses.model');

const createSubpart = async (req, res, next) => {

    const {course_id, grade_id, subject_id, term_id,
        title, description, subpart_img, sound } = req.body

    if (!course_id || !grade_id || !subject_id
        || !term_id || !title || !description) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }

    try {
        const  subpart =
        {
            course_id,
            title,
            description,
            subpart_img,
            grade_id,
            subject_id,
            term_id,
            sound,
        }
        const data = await Subpart.create(subpart)
        return res.status(201).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Can't add Tith Subpart.!" })
    }
}


const getSubpartByGrade = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Subpart.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId,
            },
            include: [
                {
                    model: Course,
                    where: {
                        grade_id: gredId,
                        subject_id: subjectId,
                    },
                    attributes: ['course_id', 'title', 'description', 'term_id','course_sort_no'],
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

const updateSubpart = async (req, res, next) => {
    const { subpartId } = req.params
    try {

        const data = await Subpart.update(req.body, {
            where: {
                subpart_Id:subpartId,
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Subpart was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}


const updateSubpartImg = async (req, res, next) => {
    const { subpartId } = req.params
    try {

        const data = await Subpart.update(req.body, {
            where: {
                subpart_Id: subpartId,
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Subpart Img was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}



const deleteSubpart = async (req, res, next) => {
    const { subpartId } = req.params
    try {
        const data = await Subpart.findOne({
            where: {
                subpart_Id:subpartId,
            }
        })
        if (!data) {
            res.status(200).send({ message: "Course was not found.. !" })
        } else {
            await data.destroy()
            res.status(200).send({ message: "Course was delete successfully.", subpart_Id: subpartId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}
module.exports = {
    createSubpart,
    getSubpartByGrade,
    updateSubpart,
    deleteSubpart,
    updateSubpartImg,
}
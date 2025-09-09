
const sequelize = require('./../../config/database')
const { Topic, Course, Question, Subpart, Answer, Review, Vocabulary, Quiz } = require('./../models/courses.model');

const createCourse = async (req, res, next) => {

    const { course_id, topic_id, grade_id, subject_id, term_id,
        title, description, course_img, course_sort_no, active } = req.body

    if (!topic_id || !course_id || !grade_id || !subject_id
        || !term_id || !title || !description) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }

    try {
        const course =
        {
            course_id,
            topic_id,
            title,
            description,
            course_img,
            course_sort_no,
            grade_id,
            subject_id,
            term_id,
            active,
        }
        const data = await Course.create(course)
        return res.status(201).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Can't add Tith Course.!" })
    }
}


const getCoursesByGrade = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Course.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId,
            },
            include: [
                {
                    model: Topic,
                    where: {
                        grade_id: gredId,
                        subject_id: subjectId,
                    },
                    attributes: ['topic_id', 'title', 'description', 'term_id', 'active'],
                    required: false,
                },
            ],
            order: [
                ['course_sort_no', 'ASC']],

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

const updateCourse = async (req, res, next) => {
    const { courseId, gredId, subjectId, termId } = req.params
    try {

        const data = await Course.update(req.body, {
            where: {
                course_id: courseId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Course was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const updateCourseImg = async (req, res, next) => {
    const { courseImg } = req.params
    try {

        const data = await Course.update(req.body, {
            where: {
                course_img: courseImg,
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Course Img was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const deleteCourse = async (req, res, next) => {
    const { courseId, gredId, subjectId, termId } = req.params
    const t = await sequelize.transaction()

    try {
        const data = await Course.findOne({
            where: {
                course_id: courseId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId
            },
            transaction: t
        })


        if (!data) {
            await t.rollback()
            res.status(404).send({ message: "Course was not found.. !" })
        } else {

            const questions = await Question.findAll({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                },
                transaction: t
            })

            for (let q of questions) {
                await Answer.destroy({
                    where: {
                        question_id: q.question_id,
                        quiz_id: q.quiz_id,
                        grade_id: gredId,
                        subject_id: subjectId,
                        term_id: termId,
                    },
                    transaction: t
                })
            }
            await Question.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                },
                transaction: t
            })

            await Quiz.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                },
                transaction: t
            })

            await Review.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                },
                transaction: t
            })


            await Vocabulary.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                },
                transaction: t
            })


            await Subpart.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                },
                transaction: t
            })
            await data.destroy({ transaction: t })
            await t.commit()

            res.status(200).send({ message: "Course was delete successfully.", course_id: courseId })
        }
    }
    catch (err) {
        await t.rollback()
        res.status(500).send({ message: err.message || "Internal Server Error" })
        console.log("Error", err)
    }
}
module.exports = {
    createCourse,
    getCoursesByGrade,
    updateCourse,
    deleteCourse,
    updateCourseImg,
}
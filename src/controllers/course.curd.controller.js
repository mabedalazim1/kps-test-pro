
const { Topic, Course, Question, Subpart, Answer, Review, Vocabulary, Quiz } = require('./../models/courses.model');

const createCourse = async (req, res, next) => {

    const { course_id, topic_id, grade_id, subject_id, term_id,
        title, description, course_img, course_sort_no } = req.body

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
                    attributes: ['topic_id', 'title', 'description', 'term_id'],
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
    try {
        const data = await Course.findOne({
            where: {
                course_id: courseId,
                grade_id: gredId,
                subject_id: subjectId,
                term_id: termId
            }
        })


        if (!data) {
            res.status(200).send({ message: "Course was not found.. !" })
        } else {

            const questions = await Question.findAll({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                }
            })
            for (let i = 0; i < questions.length; i++) {
                const questionId = questions[i].question_id
                const quizId = questions[i].quiz_id
                await Answer.destroy({
                    where: {
                        question_id: questionId,
                        quiz_id: quizId,
                        grade_id: gredId,
                        subject_id: subjectId,
                        term_id: termId,
                    }
                })
            }
            await Question.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                }
            })

            Quiz.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                }
            })

            await Review.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                }
            })


            await Vocabulary.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                }
            })


            await Subpart.destroy({
                where: {
                    course_id: courseId,
                    grade_id: gredId,
                    subject_id: subjectId,
                    term_id: termId
                }
            })
            await data.destroy()

            res.status(200).send({ message: "Course was delete successfully.", course_id: courseId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
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

const { Course, Review } = require('./../models/courses.model');

const getReviewsByGrade = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Course.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId,
            },
            include: [
                {
                    model: Review,
                    where: {
                        grade_id: gredId,
                        subject_id: subjectId,
                    },
                    attributes: ['review_id', 'course_id', 'question', 'answer', 'question_img', 'grade_id', 'subject_id', 'term_id', 'sound'],
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

const createReview = async (req, res, next) => {

    const { course_id, question, answer, question_img,
        grade_id, subject_id, term_id, sound
    } = req.body

    if (!course_id || !grade_id || !subject_id
        || !term_id || !question || !answer) {
        return res.status(400).send({ message: "Content can not be empty.!" })
    }

    try {
        const reviewData =
        {
            course_id,
            question,
            answer,
            question_img,
            grade_id,
            subject_id,
            term_id,
            sound,
        }
        const data = await Review.create(reviewData)
        return res.status(201).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Can't add Tith Review.!" })
    }
}

const updateReview = async (req, res, next) => {
    const { reviewId } = req.params
    try {

        const data = await Review.update(req.body, {
            where: {
                review_id: reviewId,
            }
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).send({ message: "Review was updated successfully." })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const deleteReview = async (req, res, next) => {
    const { reviewId } = req.params
    try {
        const data = await Review.findOne({
            where: {
                review_id: reviewId,
            }
        })
        if (!data) {
            res.status(200).send({ message: "Review was not found.. !" })
        } else {
            await data.destroy()
            res.status(200).send({ message: "Review was delete successfully.", review_id: reviewId })
        }
    }
    catch (err) {
        res.status(500).send({ message: err })
        console.log("Error", err)
    }
}

const updateReviewImg = async (req, res, next) => {
    const { reviewId } = req.params
    try {

        const data = await Review.update(req.body, {
            where: {
                review_id: reviewId,
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


module.exports = {
    getReviewsByGrade,
    deleteReview,
    createReview,
    updateReview,
    updateReviewImg,
}
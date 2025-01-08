const {
    Topic, Course, Question, Quiz, Answer, Grade, Subject,
    Term, Subpart, Review, Vocabulary, QuizType
} = require('./../models/courses.model');


const getAllTopics = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Topic.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId,
            },
            include: [
                { model: Grade, attributes: ['grade_desc'] },
                { model: Term, attributes: ['term_desc'] },
                { model: Subject, attributes: ['subject_desc'] },
            ],
            order: [
                ['topic_id', 'ASC'], ['term_id', 'ASC']
            ]
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}
const getTopics = async (req, res, next) => {
    const { gredId, termId, subjectId } = req.params
    try {
        const data = await Topic.findAll({
            where: {
                grade_id: gredId,
                term_id: termId,
                subject_id: subjectId
            },
            include: [
                { model: Grade, attributes: ['grade_desc'] },
                { model: Term, attributes: ['term_desc'] },
                { model: Subject, attributes: ['subject_desc'] },
                {
                    model: Course,
                    where: {
                        grade_id: gredId,
                        term_id: termId,
                        subject_id: subjectId,
                    },
                    required: false,
                    attributes: ['course_id', 'title', 'description', 'course_img', 'course_sort_no']
                }
            ],
            order: [
                ['topic_sort_no', 'ASC'],
                [{ model: Course }, 'course_sort_no', 'ASC']],
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}


const getCourse = async (req, res, next) => {
    const { courseId, gredId, termId, subjectId } = req.params
    try {
        const data = await Course.findAll({
            where: {
                course_id: courseId,
                grade_id: gredId,
                term_id: termId,
                subject_id: subjectId,
            },

            include: [
                {
                    model: Subpart,
                    where: {
                        course_id: courseId,
                        grade_id: gredId,
                        term_id: termId,
                        subject_id: subjectId,
                    },
                    required: false,
                    attributes: ['course_id', 'title', 'description', 'subpart_img','sound']
                },
                {
                    model: Review,
                    where: {
                        course_id: courseId,
                        grade_id: gredId,
                        term_id: termId,
                        subject_id: subjectId,
                    },
                    required: false,
                    attributes: ['course_id', 'question', 'answer', 'question_img']
                },
                {
                    model: Vocabulary,
                    where: {
                        course_id: courseId,
                        grade_id: gredId,
                        term_id: termId,
                        subject_id: subjectId,
                    },
                    required: false,
                    attributes: ['course_id', 'vocabulary', 'vocabulary_text', 'vocabulary_kind']
                },
                {
                    model: Quiz,
                    where: {
                        course_id: courseId,
                        grade_id: gredId,
                        term_id: termId,
                        subject_id: subjectId,
                    },
                    required: false,
                    attributes: ['quiz_id', 'quiz_title', 'course_id', 'quiz_description', 'active', 'time_limit'],
                    include: [
                        {
                            model :Question,
                            where: {
                                course_id: courseId,
                                grade_id: gredId,
                                term_id: termId,
                                subject_id: subjectId,
                            },
                            required: false,
                            attributes:['question_id','quiz_id','question_img']
                        }
                    ]
                },
                
            ],
            /** 
            order: [
                [{ model: Subpart }, 'id', 'ASC'],],*/

        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

const getQuze = async (req, res, next) => {
    const { quizId, courseId, gredId, termId, subjectId } = req.params
    try {
        const data = await Quiz.findAll({
            where: {
                quiz_id: quizId,
                course_id: courseId,
                grade_id: gredId,
                term_id: termId,
                subject_id: subjectId,
            },
            include: [
                { model: QuizType },
                {
                    model: Question,
                    where: {
                        course_id: courseId,
                        quiz_id: quizId,
                        grade_id: gredId,
                        term_id: termId,
                        subject_id: subjectId,
                    },
                    required: false,
                    include: [
                        {
                            model: Answer,
                            where: {
                                course_id: courseId,
                                quiz_id: quizId,
                                grade_id: gredId,
                                term_id: termId,
                                subject_id: subjectId,
                            },
                            required: false,
                        }]
                },
            ],
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

const getTopicTitles = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Topic.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId
            },
            order: [
                ['topic_id', 'ASC']],
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

const getCourseTitles = async (req, res, next) => {
    const { gredId, subjectId } = req.params
    try {
        const data = await Course.findAll({
            where: {
                grade_id: gredId,
                subject_id: subjectId
            },
            order: [
                ['course_id', 'ASC']],
        })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}
module.exports = {
    getAllTopics,
    getTopics,
    getCourse,
    getQuze,
    getTopicTitles,
    getCourseTitles,
}
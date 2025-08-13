const { LessonVisit } = require('../models/courses.model')

const addLessonVisit = async (req, res, next) => {
    try {
        const { studentId, subjectId, termId, courseId } = req.body;

        const existing = await LessonVisit.findOne({
            where: {
                student_id: studentId,
                subject_id: subjectId,
                term_id: termId,
                course_id: courseId
            }
        });

        if (existing) {
            return res.status(200).json({ message: "الزيارة مسجلة مسبقًا" });
        }

        await LessonVisit.create({
            student_id: studentId,
            subject_id: subjectId,
            term_id: termId,
            course_id: courseId,
        });

        return res.status(201).json({ message: "تم تسجيل الزيارة" });

    } catch (err) {
        console.error("Visit Error:", err);
        res.status(500).json({ message: "خطأ أثناء تسجيل الزيارة" });
    }
}



const getLessonVisits = async (req, res, next) => {
    try {
        const { studentId, subjectId, termId } = req.params

        const visits = await LessonVisit.findAll({
            where: {
                student_id: studentId,
                subject_id: subjectId,
                term_id: termId
            },

            attributes: ['course_id']
        })

        const courseIds = visits.map(v => v.course_id)
        res.status(200).json(courseIds);
    } catch (err) {
        console.error("Get Visits Error:", err)
        res.status(500).json({ message: "خطأ أثناء استرجاع الزيارات" })
    }
}

const resetLessonVisits = async (req, res, next) => {
    try {
        const { studentId, subjectId, termId } = req.body

        const deleted = await LessonVisit.destroy({
            where: {
                student_id: studentId,
                subject_id: subjectId,
                term_id: termId
            }

        });

        res.status(200).json({ message: `تم حذف ${deleted} زيارة` })
    } catch (err) {
        console.error("Reset Visits Error:", err)
        res.status(500).json({ message: "فشل في إعادة الضبط" })
    }
}

module.exports = {
    addLessonVisit,
    getLessonVisits,
    resetLessonVisits
}


const { Op, where } = require('sequelize')

const {
    AsesArabic, AsesMath, AsesScince, AsesSocial, AsesEnglish,
    AsesDain, AsesMaharat, AsesTocnolegy, Giab, Student
} = require('./../models/assessment.model')




const getAssessment = async (req, res, next) => {
    try {
        const { student_Id, term_id } = req.params

        const data = await Student.findAll(
            {
                where: { student_Id: student_Id },
                include: [
                    { model: AsesArabic, where: { term_id: term_id }, required: false, },
                    { model: AsesMath, where: { term_id: term_id }, required: false, },
                    { model: AsesScince, where: { term_id: term_id }, required: false, },
                    { model: AsesSocial, where: { term_id: term_id }, required: false, },
                    { model: AsesEnglish, where: { term_id: term_id }, required: false, },
                    { model: AsesDain, where: { term_id: term_id }, required: false, },
                    { model: AsesMaharat, where: { term_id: term_id }, required: false, },
                    { model: AsesTocnolegy, where: { term_id: term_id }, required: false, },
                    { model: Giab, where: { term_id: term_id }, required: false, },
                ]
            })

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    } catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

module.exports = {
    getAssessment,
}
const { Op, where, Sequelize } = require('sequelize')
const {
    User, Student, Grade, Gender, Class
} = require('./../models/studentData.model')

const getStudentsData = async (req, res, next) => {

    try {

        const data = await Student.findAll({
            include: [
                {
                    model: Gender,
                    attributes: ['gender_desc'],
                    required: false,
                },
                 {
                    model: Class,
                    attributes: ['class_desc'],
                    required: false,
                },
                {
                    model: Grade,
                    attributes: ['grade_desc'],
                    required: false,
                },
                {
                    model: User,
                    on: {
                        [Op.and]: [
                            Sequelize.where(
                                Sequelize.col('Student.osraId'),
                                '=',
                                Sequelize.col('User.osraId')
                            ),
                        ]
                    },
                    attributes: ['username'],
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

module.exports = {
    getStudentsData
}
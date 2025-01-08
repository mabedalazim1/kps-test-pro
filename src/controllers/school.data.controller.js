const { Op } = require('sequelize')
const {
    User, Student, Gender, Grade, Religion, Class, TestKind, Mark,
    Sort, Degree, Arabic, Dain, Math, Scince, Social, English,
    Badania, Maharat, Tocnolegy, French, General, Login_count
} = require('./../models/school.model')

const getDegree = async (req, res, next) => {
    const { stdId, testKindId } = req.params
    try {
        //Start params
        const testKind = await Degree.findAll({
            // Replace  student_Id from react As params
            where: { student_Id: stdId },
            raw: true,
            nest: true,
            attributes: [
                'test_kind_Id', 'grade_Id',
                'sort_code', 'maharat_degre',
                'social_degre', 'tocnolegy_degre',
                'student_Id',
            ],
        })
        if (testKind.length === 0) {
            res.status(204).send({ message: "No Data" })
            return
        }
        // Replace [ test_kind_Id. grade_Id ]  from React As params
        const tetsParams = [{ test_kind_Id: testKindId },
        { grade_Id: testKind[0].grade_Id }]
        const sortId = testKind[0].sort_code
        // End params

        //Main Function

        const data = await Student.findAll({
            attributes:['student_Id', 'grade_Id','std_fullName'],
            where: { student_Id: stdId },
            include: [{ model: Grade, attributes: ['grade_desc'] },
            { model: Religion, attributes: ['religion_desc'] },
            { model: Class, attributes: ['class_desc'] },
            { model: Gender, attributes: ['gender_desc'] },
            {
                model: Degree,
                where: { test_kind_Id: testKindId },
                required: false,
                attributes: ['test_kind_Id', 'grade_Id', 'show_data',],
                include: [
                    {
                        model: Arabic,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['arabic_desc', 'arabic_degre']
                    },
                    {
                        model: Dain,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['dain_desc', 'dain_degre']
                    },
                    {
                        model: Math,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['math_desc', 'math_degre']
                    },
                    {
                        model: Scince,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['scince_desc', 'scince_degre']
                    },
                    {
                        model: Social,
                        where: {
                            [Op.or]: tetsParams
                        },
                        attributes: ['social_desc', 'social_degre'],
                        required: false,
                    },
                    {
                        model: English,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['english_desc', 'english_degre']
                    },
                    {
                        model: Maharat,
                        where: {
                            [Op.or]: tetsParams
                        },
                        attributes: ['maharat_desc', 'maharat_degre'],
                        required: false,
                    },
                    {
                        model: Tocnolegy,
                        where: {
                            [Op.or]: tetsParams
                        },
                        attributes: ['tocnolegy_desc', 'tocnolegy_degre'],
                        required: false,
                    },
                    {
                        model: Badania,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['badania_desc', 'badania_degre'],
                        required: false,
                    },
                    {
                        model: General,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['general_desc', 'general_degre']
                    },
                    {
                        model: French,
                        where: {
                            [Op.and]: tetsParams
                        },
                        attributes: ['french_desc', 'french_degre'],
                        required: false,
                    },
                    {
                        model: Sort,

                        attributes: ['sort_desc', 'sort_code']
                    },

                ],
            }


            ]
        })
      /*  const data = await User.findAll({

            where: { userSchoolId: stdId },
            attributes: ['userSchoolId', 'fullName'],
            include: {
                model: Student,
                attributes: ['student_Id', 'grade_Id'],
                include: [
                    { model: Grade, attributes: ['grade_desc'] },
                    { model: Religion, attributes: ['religion_desc'] },
                    { model: Class, attributes: ['class_desc'] },
                    { model: Gender, attributes: ['gender_desc'] },
                    {
                        model: Degree,
                        where: { test_kind_Id: testKindId },
                        required: false,
                        attributes: ['test_kind_Id', 'grade_Id', 'show_data',],
                        include: [
                            {
                                model: Arabic,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['arabic_desc', 'arabic_degre']
                            },
                            {
                                model: Dain,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['dain_desc', 'dain_degre']
                            },
                            {
                                model: Math,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['math_desc', 'math_degre']
                            },
                            {
                                model: Scince,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['scince_desc', 'scince_degre']
                            },
                            {
                                model: Social,
                                where: {
                                    [Op.or]: tetsParams
                                },
                                attributes: ['social_desc', 'social_degre'],
                                required: false,
                            },
                            {
                                model: English,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['english_desc', 'english_degre']
                            },
                            {
                                model: Maharat,
                                where: {
                                    [Op.or]: tetsParams
                                },
                                attributes: ['maharat_desc', 'maharat_degre'],
                                required: false,
                            },
                            {
                                model: Tocnolegy,
                                where: {
                                    [Op.or]: tetsParams
                                },
                                attributes: ['tocnolegy_desc', 'tocnolegy_degre'],
                                required: false,
                            },
                            {
                                model: Badania,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['badania_desc', 'badania_degre'],
                                required: false,
                            },
                            {
                                model: General,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['general_desc', 'general_degre']
                            },
                            {
                                model: French,
                                where: {
                                    [Op.and]: tetsParams
                                },
                                attributes: ['french_desc', 'french_degre'],
                                required: false,
                            },
                            {
                                model: Sort,

                                attributes: ['sort_desc', 'sort_code']
                            },

                        ],
                    }
                ]
            },
        })
*/
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


const getMark = async (req, res, next) => {
    const { stdId, testKindId } = req.params
    try {
        //Start params
        const testKind = await Mark.findAll({
            // Replace  student_Id from react As params
            where: { student_Id: stdId },
            raw: true,
            nest: true,
            attributes: [
                'test_kind_Id', 'grade_Id',
                'sort_code',
                'student_Id',
            ],
        })
        if (testKind.length === 0) {
            res.status(204).send({ message: "No Data" })
            return
        }
        // Replace [ test_kind_Id. grade_Id ]  from React As params
        const tetsParams = [{ test_kind_Id: testKindId },
        { grade_Id: testKind[0].grade_Id }]
        const sortId = testKind[0].sort_code
        // End params

        //Main Function

        const data = await Student.findAll({
            where: { student_Id: stdId },
            attributes: ['student_Id', 'grade_Id','std_fullName'],
            
                include: [
                    { model: Grade, attributes: ['grade_desc'] },
                    { model: Religion, attributes: ['religion_desc'] },
                    { model: Class, attributes: ['class_desc'] },
                    { model: Gender, attributes: ['gender_desc'] },
                    {
                        model: Mark,
                        where: { test_kind_Id: testKindId },
                        required: false,
                        include: { model: Sort }
                    }
                ]
            ,
        })
        /*
        const data = await User.findAll({
            where: { userSchoolId: stdId },
            attributes: ['userSchoolId', 'fullName'],
            include: {
                model: Student,
                attributes: ['student_Id', 'grade_Id'],
                include: [
                    { model: Grade, attributes: ['grade_desc'] },
                    { model: Religion, attributes: ['religion_desc'] },
                    { model: Class, attributes: ['class_desc'] },
                    { model: Gender, attributes: ['gender_desc'] },
                    {
                        model: Mark,
                        where: { test_kind_Id: testKindId },
                        required: false,
                        include: { model: Sort }
                    }
                ]
            },
        })
*/
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

const getDegree_B = async (req, res, next) => {
    const { stdId, testKindId } = req.params
    try {
        //Start params
        const testKind = await Degree.findAll({
            // Replace  student_Id from react As params
            where: { student_Id: stdId },
            raw: true,
            nest: true,
            attributes: [
                'test_kind_Id', 'grade_Id',
                'sort_code',
                'student_Id',
            ],
        })
        if (testKind.length === 0) {
            res.status(204).send({ message: "No Data" })
            return
        }
        // Replace [ test_kind_Id. grade_Id ]  from React As params
        const tetsParams = [{ test_kind_Id: testKindId },
        { grade_Id: testKind[0].grade_Id }]
        const sortId = testKind[0].sort_code
        // End params

        //Main Function

        const data = await Student.findAll({
            where: { student_Id: stdId },
            attributes: ['student_Id', 'grade_Id','std_fullName'],
           
                include: [
                    { model: Grade, attributes: ['grade_desc'] },
                    { model: Religion, attributes: ['religion_desc'] },
                    { model: Class, attributes: ['class_desc'] },
                    { model: Gender, attributes: ['gender_desc'] },
                    {
                        model: Degree,
                        where: { test_kind_Id: testKindId },
                        required: false,
                        include: { model: Sort }
                    }
                ]
            ,
        })
        /*
        const data = await User.findAll({
            where: { userSchoolId: stdId },
            attributes: ['userSchoolId', 'fullName'],
            include: {
                model: Student,
                attributes: ['student_Id', 'grade_Id'],
                include: [
                    { model: Grade, attributes: ['grade_desc'] },
                    { model: Religion, attributes: ['religion_desc'] },
                    { model: Class, attributes: ['class_desc'] },
                    { model: Gender, attributes: ['gender_desc'] },
                    {
                        model: Degree,
                        where: { test_kind_Id: testKindId },
                        required: false,
                        include: { model: Sort }
                    }
                ]
            },
        })
*/
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
    getDegree,
    getDegree_B,
    getMark,
}
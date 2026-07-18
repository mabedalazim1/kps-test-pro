const { Op } = require('sequelize')
const {
    User, Student, Gender, Grade, Religion, Class, TestKind, Mark,
    Sort, Degree, Arabic, Dain, Math, Scince, Social, English,
    Badania, Maharat, Tocnolegy, French, General, Login_count, DegreeArchive, MarkArchive
} = require('./../models/school.model')


const createPhraseInclude = (model, phraseWhere, attributes, required = true) => ({
    model,
    where: phraseWhere,
    attributes,
    required
});


const degreePhraseIncludes = [
    { model: Arabic, attributes: ['arabic_desc', 'arabic_degre'] },
    { model: Dain, attributes: ['dain_desc', 'dain_degre'] },
    { model: Math, attributes: ['math_desc', 'math_degre'] },
    { model: Scince, attributes: ['scince_desc', 'scince_degre'] },
    { model: Social, attributes: ['social_desc', 'social_degre'], required: false },
    { model: English, attributes: ['english_desc', 'english_degre'] },
    { model: Maharat, attributes: ['maharat_desc', 'maharat_degre'], required: false },
    { model: Tocnolegy, attributes: ['tocnolegy_desc', 'tocnolegy_degre'], required: false },
    { model: Badania, attributes: ['badania_desc', 'badania_degre'], required: false },
    { model: General, attributes: ['general_desc', 'general_degre'] },
    { model: French, attributes: ['french_desc', 'french_degre'], required: false },
];

const getDegree = async (req, res, next) => {
    const { stdId, testKindId, yearId } = req.params;
    try {
        let DegreeTable = Degree;
        let isArchive = false;

        if (yearId && Number(yearId) > 0) {
            isArchive = true;
            DegreeTable = DegreeArchive;
        }

        // معلومات الطالب الحالية
        const studentInfo = await Student.findOne({
            where: {
                student_Id: stdId
            },
            attributes: [
                'student_Id',
                'stdCode',
                'std_fullName',
                'grade_Id',
                'religion_Id',
                'class_Id',
                'gender_Id'
            ],
            raw: true
        });

        if (!studentInfo) {
            return res.status(404).send({ message: "No Student" });
        }

        let degreeWhere = {
            test_kind_Id: testKindId
        };

        // الحالي
        if (!isArchive) {

            degreeWhere.student_Id = stdId;

        }
        // الأرشيف
        else {

            degreeWhere.stdCode = studentInfo.stdCode;
            degreeWhere.Year_Id = yearId;

        }

        //Start params
        const degreeInfo = await DegreeTable.findOne({
            where: degreeWhere,
            raw: true,
            attributes: [
                'student_Id',
                'grade_Id',
                'test_kind_Id',
                'show_data',
                'sort_code',
                'maharat_degre',
                'social_degre',
                'tocnolegy_degre'
            ]
        });

        if (!degreeInfo) {
            return res.status(404).send({ message: "No Data" });
        }
        // Replace [ test_kind_Id. grade_Id ]  from React As params
        const phraseWhere = {
            [Op.and]: [
                { test_kind_Id: testKindId },
                { grade_Id: degreeInfo.grade_Id }
            ]
        };
        // End params

        //Main Function

        const data = await DegreeTable.findOne({
            attributes: [
                'student_Id',
                'grade_Id',
                'test_kind_Id',
                'show_data'
            ],
            where: degreeWhere,
            include: [
                {
                    model: Student,
                    attributes: ['std_fullName'],
                    include: [
                        {
                            model: Religion,
                            attributes: ['religion_desc']
                        },
                        {
                            model: Class,
                            attributes: ['class_desc']
                        },
                        {
                            model: Gender,
                            attributes: ['gender_desc']
                        }
                    ]
                },
                {
                    model: Grade,
                    attributes: ['grade_desc']
                },

                ...degreePhraseIncludes.map(p =>
                    createPhraseInclude(
                        p.model,
                        phraseWhere,
                        p.attributes,
                        p.required ?? true
                    )
                ),
                {
                    model: Sort,
                    attributes: ['sort_desc', 'sort_code']
                },
            ],
        }
        )
        if (!data) {
            return res.status(404).send({ message: "No Content" })
        } else {
            const item = data.toJSON();

            const {
                student,
                grade,
                student_Id,
                grade_Id,
                test_kind_Id,
                show_data,
                ...phrases
            } = item;

            const result = {
                student_Id,
                grade_Id,

                std_fullName: student.std_fullName,
                grade,
                religion: student.religion,
                class: student.class,
                gender: student.gender,

                degrees: [{
                    student_Id,
                    grade_Id,
                    test_kind_Id,
                    show_data,
                    ...phrases
                }]
            };

            return res.status(200).json([result]);
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}


const getMark = async (req, res) => {

    const { stdId, testKindId, yearId } = req.params;

    try {

        // بيانات الطالب
        const studentInfo = await Student.findOne({
            where: {
                student_Id: stdId
            },
            attributes: [
                'student_Id',
                'stdCode',
                'std_fullName'
            ],
            include: [
                {
                    model: Religion,
                    attributes: [
                        'religion_desc'
                    ]
                },
                {
                    model: Class,
                    attributes: [
                        'class_desc'
                    ]
                },
                {
                    model: Gender,
                    attributes: [
                        'gender_desc'
                    ]
                }
            ]
        });

        if (!studentInfo) {
            return res.status(404).json({
                message: "No Student"
            });
        }

        let MarkTable = Mark;

        let markWhere = {
            student_Id: stdId,
            test_kind_Id: testKindId
        };

        // الأرشيف
        if (yearId && Number(yearId) > 0) {

            MarkTable = MarkArchive;

            markWhere = {
                stdCode: studentInfo.stdCode,
                Year_Id: yearId,
                test_kind_Id: testKindId
            };
        }

        let markAttributes = [
            'grade_Id',
            'test_kind_Id',
            'arabic_degre',
            'dain_degre',
            'math_degre',
            'scince_degre',
            'social_degre',
            'english_degre',
            'maharat_degre',
            'tocnolegy_degre',
            'general_degre',
            'french_degre',
            'sort_code',
            'show_data',
            'createdAt',
            'updatedAt'
        ];

        if (yearId && Number(yearId) > 0) {

            markAttributes.unshift('archive_Id');
            markAttributes.push('stdCode');

        }
        else {

            markAttributes.unshift('id');
            markAttributes.push('student_Id');

        }

        // الدرجات - مصدر الحقيقة للصف
        const markData = await MarkTable.findOne({

            where: markWhere,

            attributes: markAttributes,

            include: [
                {
                    model: Grade,
                    attributes: [
                        'grade_desc'
                    ]
                },
                {
                    model: Sort,
                    attributes: [
                        'sort_code',
                        'sort_desc'
                    ]
                }
            ]
        });

        if (!markData) {
            return res.status(404).json({
                message: "No Data"
            });
        }
        const student = studentInfo.toJSON();

        const mark = markData.toJSON();

        // إزالة الحقول الخاصة بالأرشيف وتوحيد الشكل
        const {
            grade,
            stdCode,
            archive_Id,
            ...markResult
        } = mark;

        // لو أرشيف نحول archive_Id إلى id
        if (archive_Id) {
            markResult.id = archive_Id;
        }

        const result = {
            student_Id: student.student_Id,
            grade_Id: mark.grade_Id,
            std_fullName: student.std_fullName,
            // الصف مصدره جدول الدرجات
            grade: grade,
            religion: student.religion,
            class: student.class,
            gender: student.gender,
            marks: [
                markResult
            ]
        };

        return res.status(200).json([result]);
    }
    catch (err) {

        console.log("Error", err);

        return res.status(500).json({
            message: err.message
        });
    }
};


const getDegree_B = async (req, res, next) => {
    const { stdId, testKindId, yearId } = req.params;

    try {
        let DegreeTable = Degree;
        let isArchive = false;

        if (yearId && Number(yearId) > 0) {
            DegreeTable = DegreeArchive;
            isArchive = true;
        }

        // بيانات الطالب لمعرفة stdCode في حالة الأرشيف
        const student = await Student.findOne({
            where: { student_Id: stdId },
            attributes: [
                'student_Id',
                'stdCode',
                'std_fullName'
            ]
        });

        if (!student) {
            return res.status(404).json({
                message: "No Student"
            });
        }

        const stdCode = student.stdCode;

        // تحديد البحث
        let degreeWhere = {
            test_kind_Id: testKindId
        };

        if (!isArchive) {
            degreeWhere.student_Id = stdId;
        } else {
            degreeWhere.stdCode = stdCode;
            degreeWhere.Year_Id = yearId;
        }

        // جلب الدرجة
        const degreeData = await DegreeTable.findOne({
            where: degreeWhere,
            include: [
                {
                    model: Sort,
                    attributes: [
                        'sort_code',
                        'sort_desc'
                    ],
                    required: false
                }
            ]
        });

        if (!degreeData) {
            return res.status(204).send({
                message: "No Data"
            });
        }

        const degree = degreeData.toJSON();

        // بيانات الطالب الحالية للعرض
        const studentData = await Student.findOne({
            where: {
                student_Id: stdId
            },
            attributes: [
                'student_Id',
                'grade_Id',
                'std_fullName'
            ],
            include: [
                {
                    model: Religion,
                    attributes: ['religion_desc']
                },
                {
                    model: Class,
                    attributes: ['class_desc']
                },
                {
                    model: Gender,
                    attributes: ['gender_desc']
                }
            ]
        });

        const result = {
            student_Id: stdId,
            grade_Id: degree.grade_Id,
            std_fullName: studentData.std_fullName,
            grade: {
                grade_desc:
                    await Grade.findOne({
                        where: {
                            id: degree.grade_Id
                        },
                        attributes: ['grade_desc']
                    }).then(x => x.grade_desc)
            },
            religion: studentData.religion,
            class: studentData.class,
            gender: studentData.gender,
            degrees: [
                degree
            ]
        };


        return res.status(200).json([
            result
        ]);

    }
    catch (err) {

        console.log("Error", err);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getDegree,
    getDegree_B,
    getMark,
}
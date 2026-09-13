const { Op } = require('sequelize')
const {
    User, Student, Gender, Grade, Religion, Class, TestKind, Mark,
    Sort, Degree, Arabic, Dain, Math, Scince, Social, English,
    Badania, Maharat, Tocnolegy, French, General,
    Login_count, DegreeArchive, MarkArchive, Year
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
];
// =====================================================
// النظام الجديد للدرجات
// الدرجة الأصلية من 15
// التحويل إلى 20 مع التقريب لأقرب ربع درجة
// =====================================================
const convertDegreeTo20 = (degree) => {
    if (degree === null || degree === undefined) {
        return null;
    }
    const degree20 = (Number(degree) / 15) * 20;

    return globalThis.Math.round(degree20 * 4) / 4;
};

// =====================================================
// التقييم حسب النسبة المئوية
// =====================================================

const getDegreeEvaluation = (degree, maxDegree) => {

    if (
        degree === null ||
        degree === undefined ||
        maxDegree === null ||
        maxDegree === undefined ||
        Number(maxDegree) === 0
    ) {
        return {
            degree_20: null,
            evaluation: null,
            description: null
        };
    }

    const numericDegree = Number(degree);
    const numericMaxDegree = Number(maxDegree);

    // الحد الأقصى الجديد بعد تحويل كل مادة من 15 إلى 20
    // 15 × عدد المواد → 20 × عدد المواد
    const maxDegree20 =
        (numericMaxDegree / 15) * 20;

    // تحويل الدرجة الفعلية بنفس النسبة
    const degree20 =
        (numericDegree / numericMaxDegree) * maxDegree20;

    // حساب النسبة المئوية للتقييم
    const percentage =
        (numericDegree / numericMaxDegree) * 100;

    // التقريب إلى ربع درجة
    const convertedDegree =
        globalThis.Math.round(degree20 * 4) / 4;

    if (percentage >= 85) {
        return {
            degree_20: convertedDegree,
            evaluation: "ممتاز",
            description: "أنشطة إثرائية"
        };
    }

    if (percentage >= 75) {
        return {
            degree_20: convertedDegree,
            evaluation: "جيد جدًا",
            description: "رعاية وتحفيز"
        };
    }

    if (percentage >= 65) {
        return {
            degree_20: convertedDegree,
            evaluation: "جيد",
            description: "رفع كفاءة"
        };
    }

    if (percentage >= 50) {
        return {
            degree_20: convertedDegree,
            evaluation: "مقبول",
            description: "رفع مستوى"
        };
    }

    return {
        degree_20: convertedDegree,
        evaluation: "دون المستوى",
        description: "أنشطة علاجية"
    };
};

const getNewNumericDegrees = (degreeInfo) => {

    const generalMaxDegree =
        Number(degreeInfo.grade_Id) <= 3
            ? 45
            : 75;

    const generalEvaluation =
        getDegreeEvaluation(
            degreeInfo.general_degre,
            generalMaxDegree
        );

    return {
        student_Id: degreeInfo.student_Id,
        grade_Id: degreeInfo.grade_Id,
        test_kind_Id: degreeInfo.test_kind_Id,
        show_data: degreeInfo.show_data,
        Year_Id: degreeInfo.Year_Id,
        sort_code: degreeInfo.sort_code,

        arabic_degre: degreeInfo.arabic_degre,
        arabic_degre_20: convertDegreeTo20(degreeInfo.arabic_degre),
        arabic_evaluation: getDegreeEvaluation(degreeInfo.arabic_degre, 15),

        math_degre: degreeInfo.math_degre,
        math_degre_20: convertDegreeTo20(degreeInfo.math_degre),
        math_evaluation: getDegreeEvaluation(degreeInfo.math_degre, 15),

        english_degre: degreeInfo.english_degre,
        english_degre_20: convertDegreeTo20(degreeInfo.english_degre),
        english_evaluation: getDegreeEvaluation(degreeInfo.english_degre, 15),

        scince_degre: degreeInfo.scince_degre,
        scince_degre_20: convertDegreeTo20(degreeInfo.scince_degre),
        scince_evaluation: getDegreeEvaluation(degreeInfo.scince_degre, 15),

        social_degre: degreeInfo.social_degre,
        social_degre_20: convertDegreeTo20(degreeInfo.social_degre),
        social_evaluation: getDegreeEvaluation(degreeInfo.social_degre, 15),

        general_degre: degreeInfo.general_degre,
        general_degre_20: generalEvaluation.degree_20,
        general_evaluation: generalEvaluation,

        dain_degre: degreeInfo.dain_degre,
        dain_degre_20: convertDegreeTo20(degreeInfo.dain_degre),
        dain_evaluation: getDegreeEvaluation(degreeInfo.dain_degre, 15),

        tocnolegy_degre: degreeInfo.tocnolegy_degre,
        tocnolegy_degre_20: convertDegreeTo20(degreeInfo.tocnolegy_degre),
        tocnolegy_evaluation: getDegreeEvaluation(degreeInfo.tocnolegy_degre, 15),

        maharat_degre: degreeInfo.maharat_degre,
        maharat_degre_20: convertDegreeTo20(degreeInfo.maharat_degre),
        maharat_evaluation: getDegreeEvaluation(degreeInfo.maharat_degre, 15)
    };
};


const getOldDegreeWithPhrases = async ({
    DegreeTable,
    degreeWhere,
    testKindId,
    gradeId
}) => {

    const phraseWhere = {
        [Op.and]: [
            {
                test_kind_Id: testKindId
            },
            {
                grade_Id: gradeId
            }
        ]
    };

    const data = await DegreeTable.findOne({
        where: degreeWhere,

        attributes: [
            'student_Id',
            'grade_Id',
            'test_kind_Id',
            'show_data',
            'Year_Id'
        ],

        include: [
            {
                model: Student,
                attributes: [
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
            },

            {
                model: Grade,
                attributes: [
                    'grade_desc'
                ]
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
                attributes: [
                    'sort_desc',
                    'sort_code'
                ]
            }
        ]
    });

    return data;
};

const getOldPrepNumericDegree = async ({
    DegreeTable,
    degreeWhere
}) => {

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

    return degreeData;
};


const getDegree = async (req, res, next) => {

    const { stdId, testKindId, yearId } = req.params;
    try {

        // =====================================================
        // تحديد السنة الحالية
        // =====================================================
        const currentYear = await Year.findOne({
            where: {
                IsCurrent: true
            },
            attributes: [
                'Year_Id'
            ],
            raw: true
        });

        if (!currentYear) {
            return res.status(500).json({
                message: "Current school year is not configured."
            });
        }
        const currentYearId = currentYear.Year_Id;

        // =====================================================
        // تحديد مصدر البيانات
        // =====================================================
        let DegreeTable = Degree;
        let isArchive = false;

        if (yearId && Number(yearId) > 0) {

            const requestedYearId = Number(yearId);

            if (requestedYearId < currentYearId) {
                DegreeTable = DegreeArchive;
                isArchive = true;
            }
        }

        // =====================================================
        // معلومات الطالب
        // =====================================================
        const studentInfo = await Student.findOne({
            where: {
                student_Id: stdId
            },
            attributes: [
                'student_Id',
                'stdCode',
                'std_fullName',
                'grade_Id'
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
        // =====================================================
        // شروط البحث
        // =====================================================

        let degreeWhere = {
            test_kind_Id: testKindId
        };

        if (!isArchive) {
            degreeWhere.student_Id = stdId;
        } else {
            degreeWhere.stdCode = studentInfo.stdCode;
            degreeWhere.Year_Id = Number(yearId);
        }

        // =====================================================
        // جلب بيانات الدرجة الأساسية
        // =====================================================
        const degreeInfo = await DegreeTable.findOne({

            where: degreeWhere,
            raw: true,
            attributes: [
                'student_Id',
                'grade_Id',
                'test_kind_Id',
                'show_data',
                'Year_Id',
                'sort_code',
                'arabic_degre',
                'dain_degre',
                'math_degre',
                'scince_degre',
                'social_degre',
                'english_degre',
                'maharat_degre',
                'tocnolegy_degre',
                'general_degre'
            ]
        });
        if (!degreeInfo) {
            return res.status(404).json({
                message: "No Data"
            });
        }

        // =====================================================
        // تحديد نظام الدرجات
        //
        // الصفوف 10 و11
        // → نظام العبارات دائمًا
        //
        // الصفوف 1 إلى 6
        // Year_Id < 6  → نظام العبارات القديم
        // Year_Id >= 6 → النظام الرقمي الجديد
        //
        // الصفوف 7 إلى 9
        // Year_Id < 6  → النظام الرقمي القديم للإعدادي
        // Year_Id >= 6 → النظام الرقمي الجديد
        // =====================================================
        const isNewDegreeSystem =
            Number(degreeInfo.grade_Id) >= 1 &&
            Number(degreeInfo.grade_Id) <= 9 &&
            Number(degreeInfo.Year_Id) >= 6;

        // =====================================================
        // اسم الصف
        // =====================================================
        const gradeData = await Grade.findOne({
            where: {
                id: degreeInfo.grade_Id
            },
            attributes: [
                'grade_desc'
            ],
            raw: true
        });

        if (!gradeData) {
            return res.status(404).json({
                message: "No Grade"
            });
        }

        // =====================================================
        // النظام الجديد

        if (isNewDegreeSystem) {

            const degrees = getNewNumericDegrees(degreeInfo);

            const result = {
                student_Id:
                    degreeInfo.student_Id,
                grade_Id:
                    degreeInfo.grade_Id,
                std_fullName:
                    studentInfo.std_fullName,
                grade:
                    gradeData,
                religion:
                    studentInfo.religion,
                class:
                    studentInfo.class,
                gender:
                    studentInfo.gender,
                degrees: [
                    degrees
                ]
            };

            return res.status(200).json([
                result
            ]);
        }

        // =====================================================
        // الصفوف 7 إلى 9 في السنوات القديمة
        // النظام القديم الرقمي للإعدادي
        // =====================================================

        if (
            Number(degreeInfo.grade_Id) >= 7 &&
            Number(degreeInfo.grade_Id) <= 9 &&
            Number(degreeInfo.Year_Id) < 6
        ) {

            const degreeData = await getOldPrepNumericDegree({
                DegreeTable,
                degreeWhere
            });

            if (!degreeData) {
                return res.status(404).json({
                    message: "No Content"
                });
            }

            const degree = degreeData.toJSON();

            const result = {
                student_Id: stdId,
                grade_Id: degree.grade_Id,
                std_fullName:
                    studentInfo.std_fullName,
                grade:
                    gradeData,
                religion:
                    studentInfo.religion,
                class:
                    studentInfo.class,
                gender:
                    studentInfo.gender,
                degrees: [
                    degree
                ]
            };

            return res.status(200).json([
                result
            ]);
        }
        // =====================================================
        // النظام القديم
        //
        // هنا نستخدم العبارات القديمة كما هي
        // =====================================================


        const data = await getOldDegreeWithPhrases({
            DegreeTable,
            degreeWhere,
            testKindId,
            gradeId: degreeInfo.grade_Id
        });

        if (!data) {
            return res.status(404).json({
                message: "No Content"
            });
        }

        const item = data.toJSON();

        const {
            student,
            grade,
            student_Id,
            grade_Id,
            test_kind_Id,
            show_data,
            Year_Id,
            ...phrases
        } = item;

        const result = {
            student_Id,
            grade_Id,
            std_fullName:
                student.std_fullName,
            grade,
            religion:
                student.religion,
            class:
                student.class,
            gender:
                student.gender,
            degrees: [
                {
                    student_Id,
                    grade_Id,
                    test_kind_Id,
                    show_data,
                    Year_Id,
                    ...phrases
                }
            ]
        };

        return res.status(200).json([
            result
        ]);
    }
    catch (err) {

        console.log("Error", err);
        return res.status(500).json({
            message: err.message
        });
    }
};

const getMark = async (req, res) => {

    const { stdId, testKindId, yearId } = req.params;

    try {
        // =====================================================
        // السنة الحالية
        // =====================================================
        const currentYear = await Year.findOne({
            where: {
                IsCurrent: true
            },
            attributes: [
                'Year_Id'
            ],
            raw: true
        });

        if (!currentYear) {
            return res.status(500).json({
                message: "Current school year is not configured."
            });
        }
        const currentYearId = currentYear.Year_Id;

        // =====================================================
        // تحديد مصدر البيانات
        //
        // بدون yearId          → Mark
        // سنة قديمة             → MarkArchive
        // السنة الحالية/المستقبلية → Mark
        // =====================================================

        let MarkTable = Mark;
        let isArchive = false;

        if (yearId && Number(yearId) > 0) {
            const requestedYearId = Number(yearId);
            if (requestedYearId < currentYearId) {
                MarkTable = MarkArchive;
                isArchive = true;
            }
        }

        // =====================================================
        // بيانات الطالب
        // =====================================================
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

        // =====================================================
        // شروط البحث
        // =====================================================
        let markWhere = {
            test_kind_Id: testKindId
        };

        // الحالي
        if (!isArchive) {
            markWhere.student_Id = stdId;
        }
        // الأرشيف
        else {
            markWhere.stdCode = studentInfo.stdCode;
            markWhere.Year_Id = Number(yearId);
        }

        // =====================================================
        // الحقول المطلوبة
        // =====================================================

        let markAttributes = [
            'grade_Id',
            'test_kind_Id',
            'Year_Id',
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

        // =====================================================
        // حقول تختلف بين الحالي والأرشيف
        // =====================================================

        if (isArchive) {
            markAttributes.unshift('archive_Id');
            markAttributes.push('stdCode');
        }
        else {
            markAttributes.unshift('id');
            markAttributes.push('student_Id');
        }

        // =====================================================
        // الدرجات - مصدر الحقيقة للصف
        // =====================================================
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

        // =====================================================
        // إزالة الحقول الخاصة بالأرشيف وتوحيد الشكل
        // =====================================================
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

        // =====================================================
        // النتيجة
        // =====================================================
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

        return res.status(200).json([
            result
        ]);
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

        // =====================================================
        // تحديد السنة الحالية
        // =====================================================

        const currentYear = await Year.findOne({
            where: {
                IsCurrent: true
            },
            attributes: [
                'Year_Id'
            ],
            raw: true
        });

        if (!currentYear) {
            return res.status(500).json({
                message: "Current school year is not configured."
            });
        }

        const currentYearId = currentYear.Year_Id;

        // =====================================================
        // تحديد مصدر البيانات
        //
        // بدون yearId
        //        → Degree
        //
        // سنة قديمة < السنة الحالية
        //        → DegreeArchive
        //
        // السنة الحالية أو المستقبلية
        //        → Degree
        // =====================================================

        let DegreeTable = Degree;
        let isArchive = false;

        if (yearId && Number(yearId) > 0) {

            const requestedYearId = Number(yearId);

            if (requestedYearId < currentYearId) {

                DegreeTable = DegreeArchive;
                isArchive = true;
            }
        }

        // =====================================================
        // بيانات الطالب
        // =====================================================

        const student = await Student.findOne({
            where: {
                student_Id: stdId
            },
            attributes: [
                'student_Id',
                'stdCode',
                'std_fullName',
                'grade_Id'
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

        if (!student) {
            return res.status(404).json({
                message: "No Student"
            });
        }

        const stdCode = student.stdCode;

        // =====================================================
        // تحديد شروط البحث
        // =====================================================

        let degreeWhere = {
            test_kind_Id: testKindId
        };

        if (!isArchive) {
            // الجدول الحالي
            degreeWhere.student_Id = stdId;
        } else {
            // الأرشيف
            degreeWhere.stdCode = stdCode;
            degreeWhere.Year_Id = Number(yearId);
        }

        // =====================================================
        // جلب الدرجة
        // =====================================================

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

        // =====================================================
        // تحديد نظام الدرجات من السنة الموجودة في السجل
        //
        // Year_Id < 6  → النظام القديم
        // Year_Id >= 6 → النظام الجديد
        // =====================================================

        const isNewDegreeSystem =
            Number(degree.Year_Id) >= 6;

        // =====================================================
        // النظام الجديد
        //
        // كل مادة من 15
        // تتحول إلى 20
        //
        // المجموع العام:
        // الصفوف 4 - 9
        // 5 مواد × 15 = 75
        // يتحول إلى 100
        // =====================================================

        if (isNewDegreeSystem) {

            // =================================================
            // العربي
            // =================================================
            degree.arabic_degre_20 = convertDegreeTo20(degree.arabic_degre);
            degree.arabic_evaluation = getDegreeEvaluation(degree.arabic_degre, 15);

            // =================================================
            // الرياضيات
            // =================================================
            degree.math_degre_20 = convertDegreeTo20(degree.math_degre);
            degree.math_evaluation = getDegreeEvaluation(degree.math_degre, 15);

            // =================================================
            // العلوم
            // =================================================
            degree.scince_degre_20 = convertDegreeTo20(degree.scince_degre);
            degree.scince_evaluation = getDegreeEvaluation(degree.scince_degre, 15);

            // =================================================
            // الدراسات
            // =================================================

            degree.social_degre_20 = convertDegreeTo20(degree.social_degre);
            degree.social_evaluation = getDegreeEvaluation(degree.social_degre, 15);

            // =================================================
            // الإنجليزي
            // =================================================
            degree.english_degre_20 = convertDegreeTo20(degree.english_degre);
            degree.english_evaluation = getDegreeEvaluation(degree.english_degre, 15);

            // =================================================
            // المجموع العام
            // 4 - 9  : 75 → 100
            // =================================================
            const generalEvaluation = getDegreeEvaluation(degree.general_degre, 75);
            degree.general_degre_20 = generalEvaluation.degree_20;
            degree.general_evaluation = generalEvaluation;

            // =================================================
            // الدين
            // =================================================
            degree.dain_degre_20 = convertDegreeTo20(degree.dain_degre);
            degree.dain_evaluation = getDegreeEvaluation(degree.dain_degre, 15);

            // =================================================
            // المهارات
            // =================================================
            degree.maharat_degre_20 = convertDegreeTo20(degree.maharat_degre);
            degree.maharat_evaluation = getDegreeEvaluation(degree.maharat_degre, 15);

            // =================================================
            // التكنولوجيا
            // =================================================
            degree.tocnolegy_degre_20 = convertDegreeTo20(degree.tocnolegy_degre);
            degree.tocnolegy_evaluation = getDegreeEvaluation(degree.tocnolegy_degre, 15);


        }

        // =====================================================
        // بيانات الصف
        // =====================================================

        const gradeData = await Grade.findOne({
            where: {
                id: degree.grade_Id
            },
            attributes: [
                'grade_desc'
            ],
            raw: true
        });

        if (!gradeData) {
            return res.status(404).json({
                message: "No Grade"
            });
        }


        // =====================================================
        // النتيجة
        // =====================================================

        const result = {
            student_Id: stdId,
            grade_Id: degree.grade_Id,
            std_fullName:
                student.std_fullName,
            grade:
                gradeData,
            religion:
                student.religion,
            class:
                student.class,
            gender:
                student.gender,
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

        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    getDegree,
    getDegree_B,
    getMark,
}
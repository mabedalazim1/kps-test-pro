const db = require('../../../config/database');
const Sequelize = require('sequelize');
const StudentModel = require('./student.model')
const ClassModel = require('./class.model')
const DegreeModel = require('./degree.model')
const MarkModel = require('./mark.model')
const GenderModel = require('./gender.model')
const GradeModel = require('./grade.model')
const PhraseArabicModel = require('./phrase_arabic.model')
const PhraseDainModel = require('./phrase_dain.model')
const PhraseMathModel = require('./phrase_math.model')
const PhraseScinceModel = require('./phrase_scince.model')
const PhraseSocialModel = require('./phrase_social.model')
const PhraseEnglishModel = require('./phrase_english.model')
const PhraseMaharatModel = require('./phrase_maharat.model')
const PhraseTocnolegyModel = require('./phrase_tocnolegy.model')
const PhraseBadaniaModel = require('./phrase_badania.model')
const PhraseGeneralModel = require('./phrase_general.model')
const PhraseFrenchModel = require('./phrase_french.model')
const SortModel = require('./sort.model.js')
const ReligionModel = require('./religion.model')
const TestKindModel = require('./test.kind.model');
const UserdModel = require('./../user.model');
const LoginModel = require('./login_count.model');
const CountModel = require('./count.model');
const LoginDataModel = require('./v_login_data.model');
// Get Data
const { graderData, classeData, testKindData } = require('../../data/schoolData')
// Create Models

const Degree = DegreeModel(db, Sequelize)
const Mark = MarkModel(db, Sequelize)
const Class = ClassModel(db, Sequelize)
const Student = StudentModel(db, Sequelize)
const TestKind = TestKindModel(db, Sequelize)
const PhraseArabic = PhraseArabicModel(db, Sequelize)
const PhraseDain = PhraseDainModel(db, Sequelize)
const PhraseMath = PhraseMathModel(db, Sequelize)
const PhraseScince = PhraseScinceModel(db, Sequelize)
const PhraseSocial = PhraseSocialModel(db, Sequelize)
const PhraseEnglish = PhraseEnglishModel(db, Sequelize)
const PhraseMaharat = PhraseMaharatModel(db, Sequelize)
const PhraseTocnolegy = PhraseTocnolegyModel(db, Sequelize)
const PhraseBadania = PhraseBadaniaModel(db, Sequelize)
const PhraseGeneral = PhraseGeneralModel(db, Sequelize)
const PhraseFrench = PhraseFrenchModel(db, Sequelize)
const Grade = GradeModel(db, Sequelize)
const Gender = GenderModel(db, Sequelize)
const Religion = ReligionModel(db, Sequelize)
const Sort = SortModel(db, Sequelize)
const User = UserdModel(db, Sequelize)
const Login = LoginModel(db, Sequelize)
const Count = CountModel(db, Sequelize)
const LoginData = LoginDataModel(db, Sequelize)

// Define Relationships

Student.hasOne(User, {foreignKey: 'userSchoolId'})
User.belongsTo(Student, {foreignKey: 'userSchoolId'})

User.hasMany(Login, {foreignKey: 'userSchoolId'})
Login.belongsTo(User, {foreignKey: 'userSchoolId'})

Student.hasMany(Degree, {foreignKey: 'student_Id'})
Degree.belongsTo(Student, {foreignKey: 'student_Id'})

Student.hasMany(Mark, {foreignKey: 'student_Id'})
Mark.belongsTo(Student, {foreignKey: 'student_Id'})

Class.hasMany(Student, {foreignKey: 'class_Id'})
Student.belongsTo(Class, {foreignKey: 'class_Id'})

Grade.hasMany(Student, {foreignKey: 'grade_Id'})
Student.belongsTo(Grade, {foreignKey: 'grade_Id'})

PhraseArabic.hasMany(Degree,{foreignKey:'arabic_degre'})
Degree.belongsTo(PhraseArabic,{foreignKey:'arabic_degre'})

PhraseDain.hasMany(Degree,{foreignKey:'dain_degre'})
Degree.belongsTo(PhraseDain,{foreignKey:'dain_degre'})

PhraseMath.hasMany(Degree,{foreignKey:'math_degre'})
Degree.belongsTo(PhraseMath,{foreignKey:'math_degre'})

PhraseScince.hasMany(Degree,{foreignKey:'scince_degre'})
Degree.belongsTo(PhraseScince,{foreignKey:'scince_degre'})

PhraseSocial.hasMany(Degree,{foreignKey:'social_degre'})
Degree.belongsTo(PhraseSocial,{foreignKey:'social_degre'})

PhraseEnglish.hasMany(Degree,{foreignKey:'english_degre'})
Degree.belongsTo(PhraseEnglish,{foreignKey:'english_degre'})

PhraseMaharat.hasMany(Degree,{foreignKey:'maharat_degre'})
Degree.belongsTo(PhraseMaharat,{foreignKey:'maharat_degre'})

PhraseTocnolegy.hasMany(Degree,{foreignKey:'tocnolegy_degre'})
Degree.belongsTo(PhraseTocnolegy,{foreignKey:'tocnolegy_degre'})

PhraseBadania.hasMany(Degree,{foreignKey:'badania_degre'})
Degree.belongsTo(PhraseBadania,{foreignKey:'badania_degre'})

PhraseGeneral.hasMany(Degree,{foreignKey:'general_degre'})
Degree.belongsTo(PhraseGeneral,{foreignKey:'general_degre'})

PhraseFrench.hasMany(Degree,{foreignKey:'french_degre'})
Degree.belongsTo(PhraseFrench,{foreignKey:'french_degre'})

Sort.hasMany(Degree, {foreignKey: 'sort_code'})
Degree.belongsTo(Sort, {foreignKey: 'sort_code'})

Sort.hasMany(Mark, {foreignKey: 'sort_code'})
Mark.belongsTo(Sort, {foreignKey: 'sort_code'})

Religion.hasMany(Student, {foreignKey: 'religion_Id'})
Student.belongsTo(Religion, {foreignKey: 'religion_Id'})

Gender.hasMany(Student, {foreignKey: 'gender_Id'})
Student.belongsTo(Gender, {foreignKey: 'gender_Id'})

// Init Data
const initialSchoolData = async () => {

    // Insert Data To School Tables
    // Gender Data
    await Gender.findOrCreate({
        where: { id: 1 },
        defaults: {
            id: 1,
            gender_desc: 'ذكر'
        }
    })
    await Gender.findOrCreate({
        where: { id: 2 },
        defaults: {
            id: 2,
            gender_desc: 'أنثى'
        }
    })
    // Religion Data
    await Religion.findOrCreate({
        where: { id: 1 },
        defaults: {
            id: 1,
            religion_desc: 'مسلم'
        }
    })
    await Religion.findOrCreate({
        where: { id: 2 },
        defaults: {
            id: 2,
            religion_desc: 'مسيحى'
        }
    })

    // Grade Data
    graderData.map(grade => {
        Grade.findOrCreate({
            where: { id: grade.id },
            defaults: {
                id: grade.id,
                grade_desc: grade.grade_desc
            }
        })
    })

    // Classe Data
    classeData.map(classe => {
        Class.findOrCreate({
            where: { id: classe.id },
            defaults: {
                id: classe.id,
                class_desc: classe.class_desc,
                grade_Id: classe.grade_Id,
            }
        })
    })
    // Test kind
    testKindData.map(test => {
        TestKind.findOrCreate({
            where: { id: test.id },
            defaults: { id: test.id, testkind_desc: test.testkind_desc }
        })
    })

    console.log('Student Data Created!');
}
// generate Tables in DB
const creatSqlStudentData = () => db.sync({ force: false }).then(() => {
    console.log('Student Tables Created!');
});


const studentModels = {
    creatSqlStudentData,
    initialSchoolData,
    Student,
    Class,
    Gender,
    Grade,
    Degree,
    Mark,
    Arabic: PhraseArabic,
    Dain: PhraseDain,
    Math: PhraseMath,
    Scince: PhraseScince,
    Social: PhraseSocial,
    English: PhraseEnglish,
    Badania: PhraseBadania,
    Maharat: PhraseMaharat,
    Tocnolegy: PhraseTocnolegy,
    General: PhraseGeneral,
    French: PhraseFrench,
    Religion,
    TestKind,
    Sort,
    User,
    Login_count: Login,
    Count_Visits : Count,
    LoginData,
}

module.exports = studentModels;
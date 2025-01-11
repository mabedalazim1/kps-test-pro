const db = require('../../../config/database')
const Sequelize = require('sequelize')

const StudentModel = require('./../school.model/student.model')

const AsesArabicModel = require('./assessment.arabic.model')
const AsesMathModel = require('./assessment.math.model')
const AsesEnglishModel = require('./assessment.english.model')
const AsesMaharatModel = require('./assessment.maharat.model')
const AsesScinceModel = require('./assessment.scince.model')
const AsesSocialModel = require('./assessment.social.model')
const AsesTocnolegyModel = require('./assessement.tocnolegy.model')
const AsesDainModel = require('./assessment.dain.model')
const GiabModel = require('./giab.model')


// Get Data

// Create Models
const Student = StudentModel(db, Sequelize)

const AsesArabic = AsesArabicModel(db, Sequelize)
const AsesMath = AsesMathModel(db, Sequelize)
const AsesDain = AsesDainModel(db, Sequelize)
const AsesEnglish = AsesEnglishModel(db, Sequelize)
const AsesMaharat = AsesMaharatModel(db, Sequelize)
const AsesScince = AsesScinceModel(db, Sequelize)
const AsesSocial = AsesSocialModel(db, Sequelize)
const AsesTocnolegy = AsesTocnolegyModel(db, Sequelize)
const Giab = GiabModel(db,Sequelize)

// Define Relationships

Student.hasMany(AsesArabic,{foreignKey:'student_Id'})
AsesArabic.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(AsesMath,{foreignKey:'student_Id'})
AsesMath.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(AsesDain,{foreignKey:'student_Id'})
AsesDain.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(AsesEnglish,{foreignKey:'student_Id'})
AsesEnglish.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(AsesMaharat,{foreignKey:'student_Id'})
AsesMaharat.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(AsesScince,{foreignKey:'student_Id'})
AsesScince.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(AsesSocial,{foreignKey:'student_Id'})
AsesSocial.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(AsesTocnolegy,{foreignKey:'student_Id'})
AsesTocnolegy.belongsTo(Student,{foreignKey:'student_Id'})

Student.hasMany(Giab,{foreignKey:'student_Id'})
Giab.belongsTo(Student,{foreignKey:'student_Id'})

// generate Tables in DB
const creatSqlAssessmentData = () => db.sync({ force: false }).then(() => {
    console.log('Assessment Tables Created!');
});


const assessmentModels = {
    creatSqlAssessmentData,
    Student,
   AsesArabic,
   AsesDain,
   AsesEnglish,
   AsesMaharat,
   AsesMath,
   AsesScince,
   AsesSocial,
   AsesTocnolegy,
   Giab,
}

module.exports = assessmentModels;
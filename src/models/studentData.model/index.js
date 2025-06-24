const db = require('./../../../config/database')
const Sequelize = require('sequelize')

const StudentModel = require('./../school.model/student.model')
const UserdModel = require('./../user.model')
const GradeModel = require('./../school.model/grade.model')
const ClassModel = require('./../school.model/class.model')
const GenderModel = require('./../school.model/gender.model')



const User = UserdModel(db, Sequelize)
const Student = StudentModel(db, Sequelize)
const Class = ClassModel(db, Sequelize)
const Grade = GradeModel(db, Sequelize)
const Gender = GenderModel(db, Sequelize)


// Define Relationships
User.hasMany(Student, {foreignKey: 'osraId'})
Student.belongsTo(User, {foreignKey: 'osraId'})

Class.hasMany(Student, {foreignKey: 'class_Id'})
Student.belongsTo(Class, {foreignKey: 'class_Id'})

Grade.hasMany(Student, {foreignKey: 'grade_Id'})
Student.belongsTo(Grade, {foreignKey: 'grade_Id'})

Gender.hasMany(Student, {foreignKey: 'gender_Id'})
Student.belongsTo(Gender, {foreignKey: 'gender_Id'})


const studentModels = {
    
    User,
    Student,
    Class,
    Grade,
    Gender,
}

module.exports = studentModels;
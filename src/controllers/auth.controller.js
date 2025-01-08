const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config/auth.config')
const dataModels = require('../models')
const studentModels = require('./../models/school.model')
const Students = studentModels.Student
const User = dataModels.User
const Role = dataModels.Role
const db = require('../../config')
const Op = db.Sequelize.Op

exports.signup = (req, res, next) => {
  User.findAll({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'User name exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return {
              msg: 'status(500)',
              error: err
            }
          } else {
            let newUser = {
              username: req.body.username,
              password: hash
            }
            User.create(newUser)
              .then(user => {
                if (req.body.roles) {
                  Role.findAll({
                    where: {
                      name: {
                        [Op.or]: req.body.roles
                      }
                    }
                  }).then(roles => {
                    user.setRoles(roles)
                  })
                } else {
                  // user role = 1
                  user.setRoles([1])
                }
              })
              .then(res.send({ message: 'User was registered successfully!' }))
          }
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        msg: 'status(500)',
        error: err
      })
    })
}

exports.signin = (req, res) => {
  var stdGender = ''
  var stdGrade = ''
  var stdClass = ''
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      if (user.userSchoolId !== null) {
        Students.findAll({
          where: { student_Id: user.userSchoolId },
        }).then(std => {
          stdGender = std[0].gender_Id
          stdGrade = std[0].grade_Id
          stdClass = std[0].class_Id

        })
      }

      if (user.osraId !== null) {
        var students = []
        Students.findAll({
          where: { osraId: user.osraId },
        }).then(stdudent => {
          if(stdudent.length > 0){
            for (let i = 0; i < stdudent.length; i++) {
              
              students.push({
                student_Id: stdudent[i].student_Id,
                stdGender : stdudent[i].gender_Id,
                stdGrade : stdudent[i].grade_Id,
                stdClass : stdudent[i].class_Id,
                firstName:stdudent[i].std_firstName,
                fulltName:stdudent[i].std_fullName,
              })
            }
          }else{
            students = null
          }
        })
      }
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password or User name!',
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
           expiresIn: 7200 // 2 hours
        // expiresIn: 60 // one mn
      })
      var authorities = []
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase())
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          firstName: user.firstName,
          userSchoolId: user.userSchoolId,
          stdGrade: stdGrade,
          stdGender: stdGender,
          stdClass : stdClass,
          students,
        })
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
      res.status(403).send({ message: err.message })
    })
}


exports.osraSingin =  (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      if (user.osraId !== null) {
        var students = []
        Students.findAll({
          where: { osraId: user.osraId },
        }).then(stdudent => {
          if(stdudent.length > 0){
            for (let i = 0; i < stdudent.length; i++) {
              
              students.push({
                student_Id: stdudent[i].student_Id,
                stdGender : stdudent[i].gender_Id,
                stdGrade : stdudent[i].grade_Id,
                stdClass : stdudent[i].class_Id,
                firstName:stdudent[i].std_firstName,
                fulltName:stdudent[i].std_fullName,
              })
            }
          }else{
            students = null
          }
        })
      }
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Invalid Password or User name!',
        })
      }

      var authorities = []
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase())
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          firstName: user.firstName,
          students:students,
        })
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
      res.status(403).send({ message: err.message })
    })
}

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

exports.signin = async (req, res) => {

  try {

    let stdGender = '';
    let stdGrade = '';
    let stdClass = '';
    let stdCode = '';
    let students = null;

    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'تأكد من اسم المستخدم وكلمة المرور.'
      });
    }

    // التحقق من كلمة المرور
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(200).send({
        success: false,
        message: 'تأكد من اسم المستخدم وكلمة المرور.'
      });
    }

    // التحقق من تفعيل الحساب
    if (!user.IsActive) {
      return res.status(200).send({
        success: false,
        message: 'تم إيقاف هذا الحساب. يرجى التواصل مع إدارة المدرسة.'
      });
    }

    // بيانات الأسرة والطلاب
    if (user.osraId !== null) {

      const studentList = await Students.findAll({
        where: { osraId: user.osraId }
      });

      if (studentList.length > 0) {

        students = studentList.map(std => ({
          student_Id: std.student_Id,
          stdCode: std.stdCode,
          stdGender: std.gender_Id,
          stdGrade: std.grade_Id,
          stdClass: std.class_Id,
          firstName: std.std_firstName,
          fulltName: std.std_fullName,
        }));

      }
    }

    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        expiresIn: 7200
      }
    );

    const roles = await user.getRoles();

    const authorities = roles.map(role => (
      'ROLE_' + role.name.toUpperCase()
    ));

    let loginDataKey = null;

    if (authorities.includes("ROLE_TEACHER")) {
      loginDataKey = req.body.password;
    }

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      firstName: user.firstName,
      userSchoolId: user.userSchoolId,
      stdGrade,
      stdGender,
      stdClass,
      stdCode,
      students,
      loginDataKey
    });

  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};


exports.osraSingin = async (req, res) => {

  try {

    let students = null;

    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'تأكد من اسم المستخدم وكلمة المرور.'
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(200).send({
        success: false,
        message: 'تأكد من اسم المستخدم وكلمة المرور.'
      });
    }

    if (!user.IsActive) {
      return res.status(200).send({
        success: false,
        message: 'تم إيقاف هذا الحساب. يرجى التواصل مع إدارة المدرسة.'
      });
    }

    if (user.osraId !== null) {

      const studentList = await Students.findAll({
        where: { osraId: user.osraId }
      });

      if (studentList.length > 0) {

        students = studentList.map(std => ({
          student_Id: std.student_Id,
          stdCode: std.stdCode,
          stdGender: std.gender_Id,
          stdGrade: std.grade_Id,
          stdClass: std.class_Id,
          firstName: std.std_firstName,
          fulltName: std.std_fullName,
        }));

      }

    }

    const roles = await user.getRoles();

    const authorities = roles.map(role =>
      'ROLE_' + role.name.toUpperCase()
    );

    return res.status(200).send({
      id: user.id,
      username: user.username,
      roles: authorities,
      firstName: user.firstName,
      students
    });

  } catch (err) {

    return res.status(500).send({
      message: err.message
    });

  }

};


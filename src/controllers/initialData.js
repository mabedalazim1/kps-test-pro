const  Sequelize = require('sequelize');
const  db = require('../../config/database.js');
const   RoleModel = require ('../models/role.model');
const Role = RoleModel(db, Sequelize)

const initial = () => {
    Role.create({
      id: 1,
      name: 'admin'
    })
    Role.create({
      id: 2,
      name: 'teacher'
    })
    Role.create({
      id: 3,
      name: 'student'
    })
    Role.create({
      id: 4,
      name: 'moderator'
    })
    Role.create({
      id: 5,
      name: 'user'
    })
}

module.exports = initial;
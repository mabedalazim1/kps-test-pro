const db = require('../../config/database');
const  Sequelize = require('sequelize');
const ImageDataModel = require('./imageData.model');
const ImgCatogeryModel = require('./imageCatogery.model');
const ImgSectionModel = require('./imageSection.model');
const UserModel = require('./user.model');
const RoleModel = require('./role.model');
const initial = require('../controllers/initialData');

// Create Models
const ImageData = ImageDataModel(db,Sequelize);
const ImagCatogery = ImgCatogeryModel(db,Sequelize);
const ImageSection = ImgSectionModel(db, Sequelize);
const User = UserModel(db,Sequelize);
const Role = RoleModel(db, Sequelize);
const UserRole = db.define('user_role');


// Define Relationships

ImageSection.hasMany(ImagCatogery);
ImagCatogery.belongsTo(ImageSection);

ImagCatogery.hasMany(ImageData);
ImageData.belongsTo(ImagCatogery);

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleId',
    otherKey: 'userId'
});
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    otherKey: 'roleId'
});

// generate Tables in DB
const creatSqlData = ()=> db.sync({ force: false }).then(() => {
    console.log('Tables Created!');
});

// Set ROLES 
const ROLES = ['admin', 'teacher', 'student', 'moderator', 'user'];
const dataModels = {
  ImageData,
  ImageSection,
  ImagCatogery,
  User,
  Role,
  ROLES,
  UserRole,
  creatSqlData,
  initial,
}

module.exports = dataModels;
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const db = require('../../config/database.js');
const RoleModel = require('../models/role.model');
const ImageSctionModel = require('../models/imageSection.model');
const ImageCatogeryModel = require('../models/imageCatogery.model');
const ImageDataModel = require('../models/imageData.model');
const UserModel = require('../models/user.model');
const UserRoleModel = require('../models/user_role.model');
const Role = RoleModel(db, Sequelize)
const UserRole = UserRoleModel(db, Sequelize)
const ImageSection = ImageSctionModel(db, Sequelize)
const ImageCatogery = ImageCatogeryModel(db, Sequelize)
const ImageData = ImageDataModel(db, Sequelize)
const User = UserModel(db, Sequelize)
const { Student } = require('./../models/school.model')
const { userData} = require('./../data/userData')
const { studentData } = require('./../data/StudentData')

const initial = async () => {

try{

 // Define Relations
 ImageSection.hasMany(ImageCatogery, {
  foreignKey: {name:'imageSectionId'}
});
ImageCatogery.belongsTo(ImageSection, {
  foreignKey: {name:'imageSectionId'}});

  ImageCatogery.hasMany(ImageData, {
  foreignKey: {name:'imageCatogeryId'}
});
ImageData.belongsTo(ImageCatogery, {
  foreignKey: {name:'imageCatogeryId'}});

  // Add Students
/* 
  studentData.map(async(student, index) =>{

    await Student.findOrCreate({
  where: {student_Id: student.student_Id },

  defaults: {
    student_Id: student.student_Id,
    gender_Id: student.gender_Id,
    class_Id: student.class_Id,
    grade_Id: student.grade_Id,
    religion_Id: student.religion_Id
  }
  })
}) */



  // Add Roles

  /* 
  await Role.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      name: 'admin'
    }
  })
  await Role.findOrCreate({
    where: { id: 2 },
    defaults: {
      id: 2,
      name: 'teacher'
    }
  })
  await Role.findOrCreate({
    where: { id: 3 },
    defaults: {
      id: 3,
      name: 'student'
    }
  })
  await Role.findOrCreate({
    where: { id: 4 },
    defaults: {
      id: 4,
      name: 'moderator'
    }
  })
  await Role.findOrCreate({
    where: { id: 5 },
    defaults: {
      id: 5,
      name: 'user'
    }
  })
 */


  // Add Users
 /*  bcrypt.hash("admin123", 10, async (err, hash) => {
    if (err) {
      return {
        msg: 'status(500)',
        error: err
      }
    } else {

      await User.findOrCreate({
        where: {
          id: 1
        },
        defaults: {
          id: 1,
          username: "admin",
          password: hash,
          firstName: "Admin",
        }
      })
    }
  })


 
  bcrypt.hash("user", 10, async (err, hash) => {
    if (err) {
      return {
        msg: 'status(500)',
        error: err
      }
    } else {

      await User.findOrCreate({
        where: {},
        defaults:
        {
          id: 2,
          username: "user",
          password: hash,
          firstName: "User"
        }
      })
    }
  })
 */
  
/*   // Add Users Roles
  await UserRole.findOrCreate({
    where: {  },
    defaults: {
      roleId: 1,
      userId: 1,
    }
  })

  await UserRole.findOrCreate({
    where: {  },
    defaults: {
      roleId: 5,
      userId: 2,
    }
  })
   */
  // Add All Users
  

   userData.map( async (user,index) =>{
 
  bcrypt.hash(user.password, 10, async (err, hash) => {
      if (err) {
        return {
          msg: 'status(500)',
          error: err
        }
      } else {
        await User.findOrCreate({
          where:{ username: user.username },
          defaults:{
            username: user.username,
            password: hash,
            fullName :user.fullName,
            userSchoolId:user.userSchoolId,
            firstName: user.firstName,
          }
         }).then(async (user)=>
           await UserRole.findOrCreate({
            where: { userId: user[0].id },
            defaults: {
              roleId: 3,
              userId: user[0].id,
            }
          }) 
         )
      }
    })
  })  

  
 /*  // Add Image Sections
  await ImageSection.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      title: "Static",
      sectionDesc: "Stataic Images"
    }
  })
  await ImageSection.findOrCreate({
    where: { id: 2 },
    defaults: {
      id: 2,
      title: "الأنشطة",
      sectionDesc: "الأنشطة"
    }
  })
  // Add Image Catogeres
  await ImageCatogery.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      title: "Main Slider",
      catDesc: "Main Slider Images",  
      imageSectionId:1,
    } ,
  })
  await ImageCatogery.findOrCreate({
    where: { id: 2 },
    defaults: {
      id: 2,
      title: "Logo",
      catDesc: "Max logo and Main Logo",
      imageSectionId: 1,
    },
  }) 
  await ImageCatogery.findOrCreate({
    where: { id: 3 },
    defaults: {
      id: 3,
      title: "Home Page Images",
      catDesc: "All Imeges In Home Page", 
      imageSectionId: 1,
    },
  })
  await ImageCatogery.findOrCreate({
    where: { id: 4 },
    defaults: {
      id: 4,
      title: "Testimonials",
      catDesc: "All Imeges In Testimonials",
      imageSectionId: 1,
    }
  })
  await ImageCatogery.findOrCreate({
    where: { id: 5 },
    defaults: {
      id: 5,
      title: "Certificate",
      catDesc: "All Certificate Imeges",
      imageSectionId: 1,
    },
  })
  await ImageCatogery.findOrCreate({
    where: { id: 6 },
    defaults: {
      id: 6,
      title: "About Page",
      catDesc: "All Imeges In About Page",
      imageSectionId: 1,
    },
  })
  */
}catch(err){
  console.log("Error", err);
}
} 

module.exports = initial;
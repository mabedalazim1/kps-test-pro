module.exports = (db,type)=>{
    return db.define('user', {
        username: {
            type: type.STRING,
            allowNull:false
          },password: {
            type: type.STRING
          },adress: {
            type: type.STRING
          },
          schoolImgUrl: {
            type: type.STRING
          },
          fullName: {
            type: type.STRING
          },
          userSchoolId: {
            type: type.STRING
          }
    })
    }
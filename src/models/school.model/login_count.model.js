module.exports = (db,type) => {
    return db.define('login_count', {
        id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userSchoolId:{
        type: type.INTEGER,
        allowNull : false
      },
      page:{
        type: type.STRING,
        allowNull: true,
      }
    },
    
    )
  }
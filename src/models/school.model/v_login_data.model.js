module.exports = (db,type) => {
    return db.define('v_login_data', {
      updatedAt: {
        type: type.DATE,
      },
      userId: {
        type: type.INTEGER,
      },
      fullName: {
        type: type.STRING,
      },
      grade_desc: {
        type: type.STRING,
      },
    },
    { timestamps: false,
      createdAt: false,
       updatedAt: false,
       freezeTableName: true,
       primaryKey:false,
      }
    )
  }
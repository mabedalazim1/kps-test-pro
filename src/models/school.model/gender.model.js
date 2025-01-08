module.exports = (db,type) => {
    return db.define('gender', {
        gender_desc: {
        type: type.STRING,
        allowNull: false,
      }
    },
    { timestamps: false,
      createdAt: false,
       updatedAt: false,
      }
    )
  }
  
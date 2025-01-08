module.exports = (db,type) => {
    return db.define('religion', {
        religion_desc: {
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
module.exports = (db,type) => {
  return db.define('grade', {
      grade_desc: {
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
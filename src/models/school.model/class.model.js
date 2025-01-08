module.exports = (db, type) => {
  return db.define('class', {
    class_desc: {
      type: type.STRING,
      allowNull: false,
    },
    grade_Id: {
      type: type.INTEGER,
      allowNull: false,
    },
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  )
}

module.exports = (db, type) => {
  return db.define('phrase_maharat', {
    maharat_desc: {
      type: type.STRING,
      allowNull: false,
    },
    maharat_degre: {
      type: type.INTEGER,
      primaryKey: true,
    },
    test_kind_Id: {
      type: type.INTEGER,
      primaryKey: true,
    },
    grade_Id: {
      type: type.INTEGER,
      primaryKey: true,
    }
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  )
}
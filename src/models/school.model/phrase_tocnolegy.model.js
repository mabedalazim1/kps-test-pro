module.exports = (db, type) => {
  return db.define('phrase_tocnolegy', {
    tocnolegy_desc: {
      type: type.STRING,
      allowNull: false,
    },
    tocnolegy_degre: {
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
module.exports = (db, type) => {
  return db.define('sort', {
    sort_code: {
      type: type.INTEGER,
      primaryKey: true,
    },

    sort_desc: {
      type: type.STRING,
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
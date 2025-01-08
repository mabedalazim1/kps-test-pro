module.exports = (db,type) => {
  return db.define('testkind', {
      testkind_desc: {
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
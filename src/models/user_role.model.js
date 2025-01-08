module.exports = (db,type) => {
  return db.define('user_role', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    roleId: {
      type: type.INTEGER
    },
    userId: {
      type: type.INTEGER
    },
  })
}

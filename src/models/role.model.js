module.exports = (db,type) => {
  return db.define('role', {
    name: {
      type: type.STRING
    }
  })
}

module.exports = (db,type) => {
    return db.define('push_subscription', {
        endpoint: {
            type: type.STRING,
            primaryKey: true,
            allowNull: false,
          },
          keys: {
            type: type.JSON,
            allowNull: false,
          },
          user_id:{
            type: type.STRING,
            allowNull: true,
          }
  })
}
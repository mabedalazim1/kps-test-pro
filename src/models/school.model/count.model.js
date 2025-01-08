module.exports = (db,type) => {
    return db.define('count', {
        pageviews: {
        type: type.INTEGER,
        allowNull: false,
      },
      visits: {
        type: type.INTEGER,
        allowNull: false,
      }
    },
    { timestamps: false,
      createdAt: false,
       updatedAt: false,
      }
    )
  }
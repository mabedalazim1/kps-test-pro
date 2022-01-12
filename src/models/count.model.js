module.exports = (db,type)=>{
  return db.define('count', {
    name: {
      type: type.STRING,
      allowNull:false
    },
        count: {
            type: type.INTEGER,
    }
    })
    }
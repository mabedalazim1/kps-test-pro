module.exports  = (db,type)=>{
    return db.define('imageCatogery', {
        title: {
            type: type.STRING,
            allowNull:false
        },
        catDesc: {
            type: type.STRING,
        },
    })
    }
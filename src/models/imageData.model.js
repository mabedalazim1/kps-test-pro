module.exports  = (db,type)=>{
    return db.define('imageData', {
        imgUrl: {
            type: type.STRING,
            allowNull:false
        },
        imgDesc: {
            type: type.STRING,
        },
    })
    }
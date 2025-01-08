module.exports  = (db,type)=>{
    return db.define('imageSection', {
        title: {
            type: type.STRING,
            allowNull:false
        },
        sectionDesc: {
            type: type.STRING,
        }
    })
    }
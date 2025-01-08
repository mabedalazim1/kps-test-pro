module.exports = (db, type) => {
    return db.define('vocabulary', {
        vocabulary_Id:{
            type :type.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true,
        },
        course_id:{
            type: type.INTEGER,
            allowNull:false,
            primaryKey: true,
        },
        vocabulary :{
            type : type.STRING
        },
        vocabulary_text :{
            type : type.STRING,
        },
        vocabulary_kind:{
            type : type.TINYINT,
            defaultValue: 1
        },
        grade_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        subject_id: {
            type:
                type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        term_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        sound :{
            type : type.TINYINT,
            defaultValue: 0
        }, 
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
}
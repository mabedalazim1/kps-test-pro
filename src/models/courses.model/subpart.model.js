module.exports = (db, type) => {
    return db.define('subpart', {
        subpart_Id:{
            type :type.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true,
        },
        course_id:{
            type :type.INTEGER,
            allowNull:false,
            primaryKey: true,
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        description: {
            type: type.STRING,
            allowNull: false,
        },
        subpart_img: {
            type: type.STRING,
            allowNull: true,
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
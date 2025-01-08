module.exports = (db, type) => {
    return db.define('course', {
        course_id:{
            type :type.INTEGER,
            allowNull:false,
            primaryKey: true,
        },
        topic_id:{
            type :type.INTEGER,
            allowNull:false,
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        description: {
            type: type.STRING,
            allowNull: false,
        },

        course_img: {
            type: type.STRING,
            allowNull: true,
        }, 
        course_sort_no:{
            type :type.TINYINT,
            defaultValue:0
    },
    grade_id: {
        type: type.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    subject_id: {
        type: type.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    term_id: {
        type: type.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    },
   
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
}
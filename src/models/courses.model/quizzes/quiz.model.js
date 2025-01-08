module.exports = (db, type) => {
    return db.define('quiz', {
        quiz_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        quiz_title: {
            type: type.STRING,
            allowNull: false,
        },
        course_id:{
            type: type.INTEGER,
            allowNull:false,
            primaryKey: true,
        },
        quiz_description :{
            type : type.STRING
        },
        active :{
            type : type.TINYINT,
            defaultValue: 1
        },
        time_limit:{
            type : type.TINYINT,
            defaultValue: 5
        },
        degree:{
            type : type.TINYINT,
            defaultValue: 5
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
        sound :{
            type : type.TINYINT,
            defaultValue: 0,
        }, 
        quizType:{
            type: type.TINYINT,
            defaultValue: 0,
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
}
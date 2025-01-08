module.exports = (db, type) => {
    return db.define('question', {
        question_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        quiz_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
         course_id:{
            type :type.INTEGER,
            allowNull:false,
            primaryKey: true,
        },
        question_text: {
            type: type.STRING,
            allowNull: false,
        },
        question_img:{
            type: type.STRING,
            allowNull:false,
        },
        question_type :{
            type : type.TINYINT,
            defaultValue: 1
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
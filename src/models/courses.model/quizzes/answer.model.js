module.exports = (db, type) => {
    return db.define('answer', {
        answer_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        quiz_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        question_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        answer_text: {
            type: type.STRING,
            allowNull: false,
        },
        is_correct: {
            type:
                type.TINYINT,
            allowNull: false,
            defaultValue: 0
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
        course_id:{
            type :type.INTEGER,
            allowNull:false,
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
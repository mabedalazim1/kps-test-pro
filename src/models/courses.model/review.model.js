module.exports = (db, type) => {
    return db.define('review', {
        review_id: {
            type :type.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true,
        },
        course_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        question: {
            type: type.STRING,
            allowNull: false,
        },
        answer: {
            type: type.STRING,
            allowNull: false,
        },
        question_img: {
            type: type.STRING,
            allowNull: true,
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
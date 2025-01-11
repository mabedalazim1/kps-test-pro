module.exports = (db, type) => {
    return db.define('asesment_english', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        english_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        english_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        english_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        english_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        english_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        english_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        english_test: {
            type: type.FLOAT,
            allowNull: false,
        },
        year_id:{
            type: type.INTEGER,
            allowNull: false,
        },
        term_id:{
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        grade_id:{
            type: type.INTEGER,
            allowNull: false,
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
}
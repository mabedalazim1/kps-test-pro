module.exports = (db, type) => {
    return db.define('asesment_social', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        social_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        social_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        social_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        social_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        social_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        social_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        social_test: {
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
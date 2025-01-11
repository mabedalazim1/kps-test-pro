module.exports = (db, type) => {
    return db.define('asesment_arabic', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        arabic_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        arabic_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        arabic_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        arabic_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        arabic_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        arabic_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        arabic_test: {
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
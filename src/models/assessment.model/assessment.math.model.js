module.exports = (db, type) => {
    return db.define('asesment_math', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        math_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        math_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        math_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        math_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        math_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        math_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        math_test: {
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
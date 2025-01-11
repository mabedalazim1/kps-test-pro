module.exports = (db, type) => {
    return db.define('asesment_scince', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        scince_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        scince_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        scince_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        scince_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        scince_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        scince_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        scince_test: {
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
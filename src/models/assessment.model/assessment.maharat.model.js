module.exports = (db, type) => {
    return db.define('asesment_maharat', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        maharat_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        maharat_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        maharat_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        maharat_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        maharat_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        maharat_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        maharat_test: {
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
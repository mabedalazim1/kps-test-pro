module.exports = (db, type) => {
    return db.define('asesment_dain', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        dain_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        dain_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        dain_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        dain_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        dain_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        dain_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        dain_test: {
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
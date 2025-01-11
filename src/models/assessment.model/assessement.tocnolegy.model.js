module.exports = (db, type) => {
    return db.define('asesment_tocnolegy', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        tocnolegy_maham: {
            type: type.FLOAT,
            allowNull: false,
        },
        tocnolegy_wageb: {
            type: type.FLOAT,
            allowNull: false,
        },
        tocnolegy_nasht: {
            type: type.FLOAT,
            allowNull: false,
        },
        tocnolegy_weekly: {
            type: type.FLOAT,
            allowNull: false,
        },
        tocnolegy_monthly: {
            type: type.FLOAT,
            allowNull: false,
        },
        tocnolegy_mowazba: {
            type: type.FLOAT,
            allowNull: false,
        },
        tocnolegy_test: {
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
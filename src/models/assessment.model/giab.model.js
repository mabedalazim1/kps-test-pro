module.exports = (db, type) => {
    return db.define('giab', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        giab_no: {
            type: type.FLOAT,
            allowNull: false,
        },
        giab_rate: {
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
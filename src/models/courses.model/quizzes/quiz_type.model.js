module.exports = (db, type) => {
    return db.define('quiz_type', {
        id: {
            type: type.TINYINT,
            allowNull: false,
            primaryKey: true,
        },
        quiz_type_desc:{
            type: type.STRING,
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
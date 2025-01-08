module.exports = (db, type) => {
    return db.define('subject', {
        subject_desc: {
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
module.exports = (db, type) => {
    return db.define('term', {
        term_desc: {
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
module.exports = (db, type) => {
    return db.define('topic', {
        topic_id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        description: {
            type: type.STRING,
            allowNull: false,
        },
        grade_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            allowNull: false,
        },
        subject_id: {
            type:
                type.INTEGER,
            allowNull: false,
            primaryKey: true,
            allowNull: false,
        },
        term_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            allowNull: false,
        },
        lang: {
            type: type.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        topic_sort_no: {
            type: type.TINYINT,
            defaultValue: 0,
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
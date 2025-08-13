const { DataTypes } = require('sequelize')
module.exports = (db, type) => {
    return db.define('lesson_visit', {
        student_id: {
            type: type.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        subject_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        term_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        course_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        visited_at: {
            type: type.DATE,
        }

    },
        {
            tableName: 'lesson_visits', 
            freezeTableName: true,      
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
}
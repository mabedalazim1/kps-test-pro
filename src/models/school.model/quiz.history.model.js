module.exports = (db, type) => {

    return db.define('Student_Quiz_History', {

        Id: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        Year_Id: {
            type: type.INTEGER,
            allowNull: false
        },

        Std_Code: {
            type: type.STRING(20),
            allowNull: false
        },


        Course_Id: {
            type: type.INTEGER,
            allowNull: true
        },

        Lesson_Name: {
            type: type.STRING(200),
            allowNull: false
        },


        Quiz_Id: {
            type: type.INTEGER,
            allowNull: true
        },

        Quiz_Title: {
            type: type.STRING(255),
            allowNull: true
        },


        Grade_Id: {
            type: type.INTEGER,
            allowNull: true
        },

        Subject_Id: {
            type: type.INTEGER,
            allowNull: true
        },

        Term_Id: {
            type: type.INTEGER,
            allowNull: true
        },


        Attempt_No: {
            type: type.INTEGER,
            allowNull: false
        },


        Total_Questions: {
            type: type.INTEGER,
            allowNull: false
        },

        Answered_Questions: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        Correct_Answers: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },


        Started_At: {
            type: type.DATE,
            allowNull: false,
            defaultValue: type.NOW
        },

        Finished_At: {
            type: type.DATE,
            allowNull: true
        }

    }, {
        tableName: 'Student_Quiz_History',
        timestamps: false
    });

}
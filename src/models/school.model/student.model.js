module.exports = (db, type) => {
    return db.define('student', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        class_Id: {
            type: type.INTEGER,
            
        },
        gender_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        religion_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        grade_Id: {
            type: type.INTEGER,
            allowNull: false,
        }
        ,osraId: {
            type: type.STRING,
          }
          ,std_firstName: {
            type: type.STRING,
          }
          ,std_fullName: {
            type: type.STRING,
          }
    }
    )
}
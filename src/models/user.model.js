module.exports = (db,type)=>{
    return db.define('user', {
        username: {
            type: type.STRING,
            allowNull:false
          },password: {
            type: type.STRING
          },firstName: {
            type: type.STRING
          },
          fullName: {
            type: type.STRING
          },
          userSchoolId: {
            type: type.INTEGER
          },stdCode: {
            type: type.STRING
          },osraId: {
            type: type.STRING
          },
        IsActive: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        InactiveDate: {
            type: type.DATE,
            allowNull: true
        }
    })
    }
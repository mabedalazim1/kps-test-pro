// year.model.js

module.exports = (db, type) => {
    return db.define('MyYears', {

        Year_Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        YearDesc: {
            type: type.STRING(20),
            allowNull: false
        },

        Year: {
            type: type.INTEGER,
            allowNull: false
        },
         IsCurrent: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

    }, {
        tableName: 'MyYears',
        timestamps: false
    });
}
module.exports = (db, type) => {
    return db.define('mark', {
        student_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        arabic_degre: {
            type: type.FLOAT,
            allowNull: false,
        },
        dain_degre: {
            type: type.FLOAT,
            allowNull: false,
        },
        math_degre: {
            type: type.FLOAT,
            allowNull: false,
        },
        scince_degre: {
            type: type.FLOAT,
            allowNull: false,
        },
        social_degre: {
            type: type.FLOAT,
            defaultValue: 0,
        },
        english_degre: {
            type: type.FLOAT,
            allowNull: false,
        },
        maharat_degre: {
            type: type.FLOAT,
            defaultValue: 0,
        },
        tocnolegy_degre: {
            type: type.FLOAT,
            defaultValue: 0,
        },
        general_degre: {
            type: type.FLOAT,
            allowNull: false,
        },
        sort_code: {
            type: type.INTEGER,
        },
        test_kind_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        grade_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        french_degre: {
            type: type.FLOAT,
            defaultValue: 0,
        },
        show_data: {
            type: type.BOOLEAN,
            defaultValue: 1,
        },
    })
}
module.exports = (db, type) => {
    return db.define('degree', {
        student_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        arabic_degre: {
            type: type.INTEGER,
            allowNull: false,
        },
        dain_degre: {
            type: type.INTEGER,
            allowNull: false,
        },
        math_degre: {
            type: type.INTEGER,
            allowNull: false,
        },
        scince_degre: {
            type: type.INTEGER,
            allowNull: false,
        },
        social_degre: {
            type: type.INTEGER,
        },
        english_degre: {
            type: type.INTEGER,
            allowNull: false,
        },
        maharat_degre: {
            type: type.INTEGER,
        },
        tocnolegy_degre: {
            type: type.INTEGER,
        },
        badania_degre: {
            type: type.INTEGER,
        },
        general_degre: {
            type: type.INTEGER,
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
            type: type.INTEGER,
        },
        show_data: {
            type: type.BOOLEAN,
            defaultValue: 1,
        },
    })
}
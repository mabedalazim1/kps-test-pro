const {
    Year
} = require('./../models/school.model');

const getCurrentYear = async (req, res, next) => {

    try {

        const data = await Year.findOne({
            where: {
                IsCurrent: true
            },
            attributes: [
                'Year_Id',
                'YearDesc',
                'Year'
            ]
        });

        if (!data) {
            res.status(204).send({ message: "Current school year is not configured." });
        } else {
            res.status(200).json(data);
        }

    } catch (err) {

        console.log(err);
        res.status(500).send({ message: err });

    }

}

module.exports = {
    getCurrentYear
}
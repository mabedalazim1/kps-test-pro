const dataModels = require('../models');
const imageData = dataModels.ImageData;
const catogeryImages = dataModels.ImagCatogery;

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit, countCat) => {
    const { count: totalItems, rows: imgPagination } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(countCat / limit);

    return { totalItems, currentPage, totalPages, catogeryItems: countCat, imgPagination };
};

getImgPagination = async (req, res, next) => {
    const imageSectionId = req.params.secid
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    try {
        const data = await catogeryImages.findAndCountAll({
            where: { imageSectionId },
            order: [
                ['id', 'DESC']
            ],
            include: {
                model: imageData,
                attributes: ["id", "imgUrl", "imgDesc"], 
                limit:1,
            },
            limit,
            offset,
        })
        const countCat = await catogeryImages.count({ where: { imageSectionId } })
        if (data.length === 0 || countCat === 0) {
            res.status(204).json({ message: "No Content" })
        } else {
            const response = getPagingData(data, page, limit, countCat);
            res.status(200).json(response)
            console.log(response)

        }
    } catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

module.exports = {
    getImgPagination,
}
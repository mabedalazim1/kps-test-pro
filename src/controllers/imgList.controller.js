const config = require("../../config/auth.config.js");
const dataModels = require('../models');
const imageData = dataModels.ImageData
const sectionImages = dataModels.ImageSection
const catogeryImages = dataModels.ImagCatogery

getList = async (req, res, next) => {
    try {

        const data = await catogeryImages.findAll({
            include: {
                model: sectionImages,
                attributes: ["id"]
            }
        })
        if (data.length === 0) {
            res.status(204).json({ msg: "No Content" })
        } else {
            res.status(200).json(data)
        console.log(data)
         }
    }
    catch (err) {
        res.status(500).json({ error: err })
        console.log("Erorr", err)
        }
    }

module.exports = {
    getList, 
   }
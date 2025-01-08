const config = require("../../config/auth.config.js");
const dataModels = require('../models');
const imageData = dataModels.ImageData
const sectionImages = dataModels.ImageSection
const catogeryImages = dataModels.ImagCatogery

getCatBySection = async (req, res, next) => {
    try {
        const data = await catogeryImages.findAll({
            include: {
                model: sectionImages,
                attributes: ["title"],
            }
        })
           
        if (data.length === 0) {
            res.status(204).json({ message: "No Content" })
        } else {
            res.status(200).json(data)
        //console.log(data)
         }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}


getAllDataCatogery = async (req, res, next) => {
    try {
        const data = await imageData.findAll({

            attributes: ["id", "imgDesc", "imgUrl"],
            include: {
                model: catogeryImages,
                attributes: ["id", "title"],
            }
        })
        if (data.length === 0) {
            res.status(204).json({ message: "No Content" })
        } else {
            res.status(200).json(data)
                
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}


getDataByCatogery = async (req, res, next) => {
    try {
        const data = await imageData.findAll({
            where: {
                imageCatogeryId: req.params.catid,
            },
            attributes: ["id", "imgDesc", "imgUrl"],
            include: {
                model: catogeryImages,
                attributes: ["title"],
            }
        })
           
        if (data.length === 0) {
            res.status(204).json({ message: "No Content" })
        } else {
            res.status(200).json(data)
        //console.log(data)
         }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

getListById = async (req, res, next) => {
    try {

        const data = await sectionImages.findAll({
            where: {
                id: req.params.secid,
            },
            attributes:["title", "sectionDesc"],
            include: {
                model: catogeryImages,
                attributes: ["id", "title", "catDesc"],
                include: {
                    model: imageData,
                    // New data
                    limit: 1,
                    attributes: ["id", "imgUrl", "imgDesc"],
                }
            }
        })
        if (data.length === 0) {
            res.status(204).json({ message: "No Content" })
        } else {
            res.status(200).json(data)
        //console.log(data)
         }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Erorr", err)
        }
}
    

getListInfoById = async (req, res, next) => {
    try {

        const data = await sectionImages.findAll({
            where: {
                id: req.params.secid,
            },
            attributes:["title", "sectionDesc"],
            include: {
                model: catogeryImages,
                attributes: ["id", "title"],
                include: {
                    model: imageData,
                    // New data
                    limit: 1,
                    where: {
                        imgDesc: req.params.classid,
                    },
                    attributes: ["id", "imgUrl", "imgDesc"],
                }
            }
        })
        if (data.length === 0) {
            res.status(204).json({ message: "No Content" })
        } else {
            res.status(200).json(data)
        //console.log(data)
         }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Erorr", err)
        }
}
    


getList = async (req, res, next) => {
    try {

        const data = await sectionImages.findAll({
           
            attributes:["title", "sectionDesc"],
            include: {
                model: catogeryImages,
                attributes:["title", "catDesc"],
                include: {
                    model: imageData,
                    attributes:["imgUrl", "imgDesc"],
                }
            }
        })
        if (data.length === 0) {
            res.status(204).json({ message: "No Content" })
        } else {
            res.status(200).json(data)
        //console.log(data)
         }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
        }
    }

    groupImages = async (req, res, next)=>{
    const data = await sectionImages.findAll({
        
        where: {
            id: req.params.secid,
        },
        attributes:["title", "sectionDesc"],
        include: {
            model: catogeryImages,
            attributes:["title", "catDesc"],
            include: {
                model: imageData,
                attributes:["imgUrl", "imgDesc"],
            }
        }
    })
    if (data.length === 0) {
        res.send( {message: 'No Data'} )
    } else {
        let response = []
        data.map((items, index) => {
            response.push({
                catogery:items.imageCatogeries ,
                images:    items.imageCatogeries[0].imageData,
            })
        })
        res.status(200).json(response)
    }
    }

module.exports = {
    getCatBySection,
    getAllDataCatogery,
    getDataByCatogery,
    getList, 
    getListById,
    groupImages,
    getListInfoById,
   }
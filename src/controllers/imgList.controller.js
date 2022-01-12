const config = require("../../config/auth.config.js");
const dataModels = require('../models');
const imageData = dataModels.ImageData
const sectionImages = dataModels.ImageSection
const catogeryImages = dataModels.ImagCatogery

getListById = async (req, res, next) => {
    try {

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

testData = async (req, res, next)=>{
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
        res.send('NO')
    } else {
        let response=[]
        data.map((items, index) => {
            response.push({
                title: items.title,
                section: items.sectionDesc,
            })
        })
        res.json(response)
    }

    console.log(data)
    }

module.exports = {
    getList, 
    getListById,
    testData,
   }
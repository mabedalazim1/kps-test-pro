const mainRout = require("../controllers/mainRoute");
// Import Models 
const dataModels = require("../models")
const ImagCatogery = dataModels.ImagCatogery;
const ImageData =  dataModels.ImageData;
const ImageSection =  dataModels.ImageSection;

// Const Curd Router
const imagesection = mainRout(ImageSection,"/imgsections");
const imageData = mainRout(ImageData,"/imgdata");
const imageCatogery = mainRout(ImagCatogery, "/imgcatogry");

// Export Routers
const curdRrouter ={
    imagesection,
    imageData,
    imageCatogery,
}

module.exports = curdRrouter;
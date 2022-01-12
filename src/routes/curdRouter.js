const mainRout = require("../controllers/mainRoute");

// Import Models 
const dataModels = require("../models")
const ImagCatogery = dataModels.ImagCatogery;
const ImageData =  dataModels.ImageData;
const ImageSection =  dataModels.ImageSection;
const User =  dataModels.User;

// Const Curd Router
const imagesection = mainRout(ImageSection,"/imgsections");
const imageData = mainRout(ImageData,"/imgdata");
const imageCatogery = mainRout(ImagCatogery, "/imgcatogery");
const user = mainRout(User, "/user");

// Export Routers
const curdRrouter ={
    imagesection,
    imageData,
    imageCatogery,
    user,
}

module.exports = curdRrouter;
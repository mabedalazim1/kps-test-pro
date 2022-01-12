const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path');


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/files/");
  },
  filename: async (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/static/uploads/images");
  },
  filename: async (req, file, cb) => {
    cb(null, "IMG" + '-' + Date.now() + path.extname(file.originalname));
  }
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: maxSize },
}).single("image");

let uploadFileMiddleware = util.promisify(uploadFile);
let uploadImageMiddleware = util.promisify(uploadImage);
module.exports = {
  uploadFileMiddleware,
  uploadImageMiddleware
};
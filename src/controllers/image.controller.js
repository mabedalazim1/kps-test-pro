const fs = require("fs");
const baseUrl = __basedir;
const directoryPath = __basedir + "/public/static/uploads/images/";
const path = require('path');
const console = require("console");
const res = require("express/lib/response");

const getListImages = (req, res) => {

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan image!",
      });
    }

    let imagesInfo = [];

    files.forEach((file) => {
      imagesInfo.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(imagesInfo);
  });
};

const downloadImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/images/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the image. " + err,
      });
    }
  });
};

const deleteImage =  (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/images/";
  const fullPath = directoryPath + fileName
  if (fs.existsSync(fullPath)) {
    fs.unlink(directoryPath + fileName,
      function (err) {
        if (err) {
          console.error(err);
          res.send({ err })
        }
        console.log('Image has been Deleted');
        res.send({ msg: 'Image has been Deleted' });
      });
  }
  else res.send("No Image exists");
}

const testImg = (req,res) => {
  res.status(200).send("Test image")
}
module.exports = {
  getListImages,
  downloadImage,
  deleteImage,
  testImg
};
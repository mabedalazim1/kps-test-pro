const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = __basedir;
const directoryPath = __basedir + "/resources/static/assets/uploads/";
const path = require('path');

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const deleteFile =  (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  const fullPath = directoryPath + fileName
  if (fs.existsSync(fullPath)) {
    fs.unlink(directoryPath + fileName,
      function (err) {
        if (err) {
          console.error(err);
          res.send({ err })
        }
        console.log('File has been Deleted');
        res.send({ msg: 'File has been Deleted' });
      });
  }
  else res.send("No File exists");
}
module.exports = {
  upload,
  getListFiles,
  download,
  deleteFile,
};
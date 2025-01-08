const uploadFile = require("../middleware/upload").uploadFileMiddleware;
const uploadImg = require("../middleware/upload").uploadImageMiddleware;
const uploadCourseImg = require("../middleware/upload").uploadImageCourseMiddleware;
const uploadSubpartImg = require("../middleware/upload").uploadImageSubpartMiddleware;
const uploadReviewtImg = require("../middleware/upload").uploadImageReviewMiddleware;
const uploadQuizImg = require("../middleware/upload").uploadImageQuizMiddleware;
const uploadVid = require('../middleware/upload').uploadVidioMiddleware

const fs = require("fs");
const baseUrl = __basedir;
const directoryPath = __basedir + "/resources/static/assets/files/";
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
        message: "File size cannot be larger than 5MB!",
      });
    }
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({
        message: "File is UNEXPECTED !",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};


const uploadImage = async (req, res) => {
  try {
    await uploadImg(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload an image!" });
    }
    res.status(200).send({
      message: "Uploaded the image successfully: " + req.file.filename,
      fileName: req.file.filename,
      filePath: `/static/uploads/images/${req.file.filename}`
    });
    //console.log(filePath)
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "Image size cannot be larger than 5MB!",
      });
    }
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({
        message: "Image is UNEXPECTED !",
      });
    }

    res.status(500).send({
      message: `Could not upload the image: ${req.file.originalname}. ${err}`,
    });
  }
};


const uploadVidio = async (req, res) => {
  try {
    await uploadVid(req, res)

    if (req.file == undefined) {
      return res.status(400).send({ message: 'Please upload a vidio!' })
    }
    res.status(200).send({
      message: 'Uploaded the vidio successfully: ' + req.file.filename,
      fileName: req.file.filename,
      filePath: `/static/uploads/videos/${req.file.filename}`
    })
    //console.log(filePath)
  } catch (err) {
    console.log(err)

    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'Vidio size cannot be larger than 100MB!'
      })
    }
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({
        message: 'Vidio is UNEXPECTED !'
      })
    }

    res.status(500).send({
      message: `Could not upload the Vidio:${req.file.originalname}. ${err}`
    })
  }
}


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
  const directoryPath = __basedir + "/resources/static/assets/files/";

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
  const directoryPath = __basedir + "/resources/static/assets/files/";
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

const uploadCourseImage = async (req, res) => {
  try {
    await uploadCourseImg(req, res);

    if (req.file == undefined ) {
      return res.status(400).send({ message: "Please upload an image!" });
    }
    res.status(200).send({
      message: "Uploaded the image successfully: " + req.file.filename,
      fileName: req.file.filename,
      filePath: `/static/uploads/courses/lessons/${req.file.filename}`
    });
    //console.log(filePath)
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "Image size cannot be larger than 5MB!",
      });
    }
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({
        message: "Image is UNEXPECTED !",
      });
    }

    res.status(500).send({
      message: `Could not upload the image: ${req.file.originalname}. ${err}`,
    });
  }
};


const uploadSubpartImage = async (req, res) => {
  try {
    await uploadSubpartImg(req, res);

    if (req.file == undefined ) {
      return res.status(400).send({ message: "Please upload an image!" });
    }
    res.status(200).send({
      message: "Uploaded the image successfully: " + req.file.filename,
      fileName: req.file.filename,
      filePath: `/static/uploads/courses/subparts/${req.file.filename}`
    });
    //console.log(filePath)
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "Image size cannot be larger than 5MB!",
      });
    }
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({
        message: "Image is UNEXPECTED !",
      });
    }

    res.status(500).send({
      message: `Could not upload the image: ${req.file.originalname}. ${err}`,
    });
  }
};

const uploadReviewImage = async (req, res) => {
  try {
    await uploadReviewtImg(req, res);

    if (req.file == undefined ) {
      return res.status(400).send({ message: "Please upload an image!" });
    }
    res.status(200).send({
      message: "Uploaded the image successfully: " + req.file.filename,
      fileName: req.file.filename,
      filePath: `/static/uploads/courses/reviews/${req.file.filename}`
    });
    //console.log(filePath)
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "Image size cannot be larger than 5MB!",
      });
    }
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({
        message: "Image is UNEXPECTED !",
      });
    }

    res.status(500).send({
      message: `Could not upload the image: ${req.file.originalname}. ${err}`,
    });
  }
};

const uploadQuizImage = async (req, res) => {
  try {
    await uploadQuizImg(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload an image!" });
    }
    res.status(200).send({
      message: "Uploaded the image successfully: " + req.file.filename,
      fileName: req.file.filename,
      filePath: `/static/uploads/courses/quizzes/${req.file.filename}`
    });
    //console.log(filePath)
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "Image size cannot be larger than 5MB!",
      });
    }
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).send({
        message: "Image is UNEXPECTED !",
      });
    }

    res.status(500).send({
      message: `Could not upload the image: ${req.file.originalname}. ${err}`,
    });
  }
};


module.exports = {
  upload,
  uploadImage,
  uploadVidio,
  getListFiles,
  download,
  deleteFile,
  uploadCourseImage,
  uploadSubpartImage,
  uploadQuizImage,
  uploadReviewImage,
};
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

const downloadQuizzesImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/quizzes/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the image. " + err,
      });
    }
  });
};
const downloadReviewsImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/reviews/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the image. " + err,
      });
    }
  });
};
const downloadSubpartsImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/subparts/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the image. " + err,
      });
    }
  });
};

const downloadLessonsImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/lessons/";

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

const deleteCourseImage =  (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/lessons/";
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

const deleteSubpartImage =  (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/subparts/";
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

const deleteReviewImage =  (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/reviews/";
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

const deleteQuestionImage =  (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/static/uploads/courses/quizzes/";
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
  testImg,
  deleteCourseImage,
  deleteSubpartImage,
  deleteReviewImage,
  deleteQuestionImage,
  downloadLessonsImage,
  downloadQuizzesImage,
  downloadReviewsImage,
  downloadSubpartsImage,
};
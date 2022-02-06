const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controller');
const imgController = require('../controllers/image.controller');
const { authJwt } = require("../middleware");
const listImages = require('./../controllers/imgList.controller')

const testAdmin = [authJwt.verifyToken, authJwt.isAdmin]
let routes = app => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Upload Files
  router.post('/api/upload', testAdmin, controller.upload);
  router.get('/api/files', controller.getListFiles);
  router.get('/api/files/:name', controller.download);
  router.delete('/api/files/:name', testAdmin, controller.deleteFile);

  // Upload Images
  router.post('/api/uploadimages', testAdmin, controller.uploadImage);
  router.get('/api/images', imgController.getListImages);
  router.get('/api/testimages', imgController.testImg);
  router.get('/api/listimages', listImages.getList);
  router.get('/api/groupimages/:secid/', listImages.groupImages);
  router.get('/api/listimages/:secid/', listImages.getListById);
  router.get('/api/images/:name', imgController.downloadImage);
  router.delete('/api/images/:name', testAdmin, imgController.deleteImage);

  // Get imgCatogery By imgSection
  router.get('/api/imgcatsection', testAdmin, listImages.getCatBySection);
  // Get imgData By Catogery
  router.get('/api/imgcatdata/:catid/',    listImages.getDataByCatogery);
  // Test Api
  router.get('/api/test', function (req, res) {
    res.send('API is working properly Kps School');
  });

  app.use(router);
}

module.exports = routes

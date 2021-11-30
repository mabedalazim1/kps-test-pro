const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controller');

let routes = app => {
  // Upload Files
  router.post('/api/upload', controller.upload);
  router.get('/api/files', controller.getListFiles);
  router.get('/api/files/:name', controller.download);
  router.delete('/api/files/:name', controller.deleteFile);

  // Test Api
  router.get('/api/test', function (req, res) {
    res.send('API is working properly Kps School');
  });

  app.use(router);
}

module.exports = routes

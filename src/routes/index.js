const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controller');
const imgController = require('../controllers/image.controller');
const { authJwt, uploadExcel } = require("../middleware");
const listImages = require('./../controllers/imgList.controller')
const ImgPagination = require('./../controllers/imgPagination')
// School Data 
const { getDegree, getMark, getDegree_B } = require('./../controllers/school.data.controller');
const { countVisits, addVisits, countLogin, addLogin, loginData } = require('../controllers/visit.count.controller');
const { LoginData } = require('../models/school.model');

// Excel Files
const excelController = require("./../controllers/excel.controller");

// Send Notifications
const notifications = require("./../controllers/notifications.controller");
const { getTopics, getCourse, getQuze, getAllTopics, getTopicTitles, getCourseTitles } = require('../controllers/courses.contoller');
const { updateTopic, deleteTopic, createTopic } = require('../controllers/topics.curd.contoller');
const { getCoursesByGrade, createCourse, updateCourse, deleteCourse, updateCourseImg } = require('../controllers/course.curd.controller')
const { getSubpartByGrade, createSubpart, updateSubpart, deleteSubpart, updateSubpartImg } = require('./../controllers/subpart.curd.controller')
const { getVocabularyByGrade, deleteVocabulary, createVocabulary, updateVocabulary } = require('./../controllers/vocabulary.curd.controller')
const { getReviewsByGrade, deleteReview, createReview, updateReview, updateReviewImg } = require('./../controllers/review.curd.controller')
const { getQuizzesByGrade, deleteQuiz, updateQuiz, createQuiz, getNewQuzeId } = require('./../controllers/quizzs.curd.controller')
const { getQuestionsByQuiz, deleteQuestion, createQuestion, updateQuestion,getNewQuestionId } = require('./../controllers/questions.curd.contoroller')
const {  getAnswersByGrade,deleteAnswer,createAnswer, updateAnswer } = require('./../controllers/answer.curd.controller')

const testAdmin = [authJwt.verifyToken, authJwt.isAdmin]

const testisStdOrAdin = [authJwt.verifyToken, authJwt.isStdOrAdmin]
const testisTechOrAdin = [authJwt.verifyToken, authJwt.isTechOrAdmin]


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
  router.post('/api/uploadcourseimage', testisTechOrAdin, controller.uploadCourseImage);
  router.post('/api/uploadsubpartimage', testisTechOrAdin, controller.uploadSubpartImage);
  router.post('/api/uploadreviewimage', testisTechOrAdin, controller.uploadReviewImage);
  router.post('/api/uploadquizimage', testisTechOrAdin, controller.uploadQuizImage);
  router.get('/api/images', imgController.getListImages);
  router.get('/api/testimages', imgController.testImg);
  router.get('/api/listimages', listImages.getList);
  router.get('/api/groupimages/:secid/', listImages.groupImages);
  router.get('/api/listimages/:secid/', listImages.getListById);
  router.get('/api/images/:name', imgController.downloadImage);
  router.get('/api/lessons/:name', imgController.downloadLessonsImage);
  router.get('/api/quizzes/:name', imgController.downloadQuizzesImage);
  router.get('/api/reviews/:name', imgController.deleteReviewImage);
  router.get('/api/subparts/:name', imgController.downloadSubpartsImage);
  router.delete('/api/images/:name', testAdmin, imgController.deleteImage);
  router.delete('/api/courseimage/:name', testisTechOrAdin, imgController.deleteCourseImage);
  router.delete('/api/subpartimage/:name', testisTechOrAdin, imgController.deleteSubpartImage);
  router.delete('/api/reviewimage/:name', testisTechOrAdin, imgController.deleteReviewImage);
  router.delete('/api/questionimage/:name', testisTechOrAdin, imgController.deleteQuestionImage);

  // Upload Vidio
  router.post('/api/uploadvidio', testAdmin, controller.uploadVidio)

  // Get imgCatogery By imgSection
  router.get('/api/imgcatsection', testAdmin, listImages.getCatBySection);
  // Get imgData By Catogery
  router.get('/api/imgcatdata', listImages.getAllDataCatogery)
  router.get('/api/imgcatdata/:catid/', listImages.getDataByCatogery)
  // Get Img Pagination
  router.get('/api/imgpagination/:secid/', ImgPagination.getImgPagination)

  // Test School Data
  router.get('/api/degree/:stdId/:testKindId/', testisStdOrAdin, getDegree)
  router.get('/api/degree_b/:stdId/:testKindId/', testisStdOrAdin, getDegree_B)
  router.get('/api/mark/:stdId/:testKindId/', testisStdOrAdin, getMark)
  router.get('/api/getListInfoById/:secid/:classid/', testisStdOrAdin, listImages.getListInfoById)

  // Courses
  router.get('/api/alltopics/:gredId/:subjectId/', testisTechOrAdin, getAllTopics)
  router.get('/api/topics/:gredId/:termId/:subjectId', testisStdOrAdin, getTopics)
  router.get('/api/course/:courseId/:gredId/:termId/:subjectId', testisStdOrAdin, getCourse)
  router.get('/api/quiz/:quizId/:courseId/:gredId/:termId/:subjectId', testisStdOrAdin, getQuze)

  // Curd Topic
  router.get('/api/topicstitle/:gredId/:subjectId', testisStdOrAdin, getTopicTitles)
  router.post('/api/topic/', testisTechOrAdin, createTopic)
  router.put('/api/topic/:topicId/:gredId/:subjectId/:termId', testisTechOrAdin, updateTopic)
  router.delete('/api/topic/:topicId/:gredId/:subjectId/:termId', testisTechOrAdin, deleteTopic)

  //Curd Courses
  router.get('/api/coursestitle/:gredId/:subjectId', testisStdOrAdin, getCourseTitles)
  router.get('/api/getcoursebygrade/:gredId/:subjectId', testisStdOrAdin, getCoursesByGrade)
  router.post('/api/course/', testisTechOrAdin, createCourse)
  router.put('/api/course/:courseId/:gredId/:subjectId/:termId', testisTechOrAdin, updateCourse)
  router.put('/api/courseimg/:courseImg/', testisTechOrAdin, updateCourseImg)
  router.delete('/api/course/:courseId/:gredId/:subjectId/:termId', testisTechOrAdin, deleteCourse)


  //Curd Subparts
  router.get('/api/getsubpartbygrade/:gredId/:subjectId', testisStdOrAdin, getSubpartByGrade)
  router.post('/api/subpart/', testisTechOrAdin, createSubpart)
  router.put('/api/subpart/:subpartId/', testisTechOrAdin, updateSubpart)
  router.put('/api/subpartimg/:subpartId/', testisTechOrAdin, updateSubpartImg)
  router.delete('/api/subpart/:subpartId/', testisTechOrAdin, deleteSubpart)

  // Curd Vocabulary
  router.get('/api/getvocabularybygrade/:gredId/:subjectId', testisStdOrAdin, getVocabularyByGrade)
  router.delete('/api/vocabulary/:vocabularyId/', testisTechOrAdin, deleteVocabulary)
  router.post('/api/vocabulary/', testisTechOrAdin, createVocabulary)
  router.put('/api/vocabulary/:vocabularyId/', testisTechOrAdin, updateVocabulary)

  // Curd Reviews
  router.get('/api/getreviewbygrade/:gredId/:subjectId', testisStdOrAdin, getReviewsByGrade)
  router.delete('/api/review/:reviewId/', testisTechOrAdin, deleteReview)
  router.post('/api/review/', testisTechOrAdin, createReview)
  router.put('/api/reviewimg/:reviewId/', testisTechOrAdin, updateReviewImg)
  router.put('/api/review/:reviewId/', testisTechOrAdin, updateReview)

  // Curd Quizzes
  router.get('/api/getquizbygrade/:gredId/:subjectId', testisStdOrAdin, getQuizzesByGrade)
  router.delete('/api/quiz/:quizId/:courseId/:gradeId/:subjectId/:termId', testisTechOrAdin, deleteQuiz)
  router.put('/api/quiz/:quizId/:courseId/:gradeId/:subjectId/:termId/', testisTechOrAdin, updateQuiz)
  router.post('/api/quiz/', testisTechOrAdin, createQuiz)
  router.get('/api/getquizid/:couresId/:gredId/:subjectId/:termId/', testisTechOrAdin, getNewQuzeId)

  // Curd Questions
  router.get('/api/getquestionsbyquiz/:quizId/:courseId/:gredId/:subjectId/:termId/', testisStdOrAdin, getQuestionsByQuiz)
  router.delete('/api/question/:questionId/:courseId/:quizId/:gradeId/:subjectId/:termId/', testisTechOrAdin, deleteQuestion)
  router.post('/api/question/', testisTechOrAdin, createQuestion)
  router.put('/api/question/:questionId/:courseId/:quizId/:gradeId/:subjectId/:termId/', testisTechOrAdin, updateQuestion)
  router.get('/api/questionid/:courseId/:quizId/:gradeId/:subjectId/:termId/', testisTechOrAdin,getNewQuestionId )
  
  //Curd Answers
  router.get('/api/answer/:questionId/:courseId/:quizId/:gradeId/:subjectId/:termId/', testisTechOrAdin,getAnswersByGrade )
  router.delete('/api/answer/:answerId/', testisTechOrAdin, deleteAnswer)
  router.post('/api/answer/', testisTechOrAdin, createAnswer)
  router.put('/api/answer/:answerId/', testisTechOrAdin, updateAnswer)

  // Test Api
  router.get('/api/test', function (req, res) {
    res.send('API is working properly Kps School');
  });


  // Excel Router
  router.post("/api/upload/student", testAdmin, uploadExcel.single("file"), excelController.upload_student);
  router.post("/api/upload/degree", testAdmin, uploadExcel.single("file"), excelController.upload_degree);
  router.post("/api/upload/mark", testAdmin, uploadExcel.single("file"), excelController.upload_mark);
  router.post("/api/upload/phrase", testAdmin, uploadExcel.single("file"), excelController.upload_phrase);
  router.get("/api/excel", excelController.getTArabic);
  router.get("/api/getuser", excelController.getUsers);


  // Count Visits
  router.get('/api/addtvisit/:type', addVisits)
  router.get('/api/countvisit', countVisits)

  // Count Logins
  router.get('/api/countlgin', countLogin)
  router.post('/api/addlogin', testisStdOrAdin, addLogin)

  // Login Data
  router.get('/api/logindata', testAdmin, loginData)

  // Send Notifications
  router.post('/api/subscribe', notifications.subscribe)
  router.post('/api/update_subscribe', notifications.update_subscribe)
  router.post('/api/sendNotification', notifications.sendNotification)

  app.use(router);

}

module.exports = routes

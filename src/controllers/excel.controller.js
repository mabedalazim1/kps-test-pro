const Degree = require('./../models/school.model').Degree
const Mark = require('./../models/school.model').Mark
const Student = require('./../models/school.model').Student
const User = require('./../models/school.model').User
const Phrase = require('./../models/school.model').General
const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

const delFile = async (path)=>{
  // Delete the file like normal
  await unlinkAsync(path)
 
} ;



const upload_student = async (req, res) => {
  
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!")
    }
    let fullPath = __basedir + "/resources/static/assets/excelFiles/"
    let path =
    fullPath + req.file.filename;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      let students = [];

      rows.forEach((row) => {

        
        // Student
     
        let student = {
          student_Id: row[0],
          gender_Id: row[1],
          class_Id: row[2],
          grade_Id: row[3], 
          religion_Id: row[4],
          createdAt: new Date(),
          updatedAt: new Date(),
        }; 
        
        students.push(student);
      });
      Student.bulkCreate(students)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.filename,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
          console.log(error);
        })
  }).then(async ()=>{
     // Delete the file like normal
     await unlinkAsync(path)
  })
 
  }
   catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.filename,
    }).then(async ()=>{
      // Delete the file like normal
      await unlinkAsync(path)
   })
  }
};


const upload_degree = async (req, res) => {
  
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!")
    }
    let fullPath = __basedir + "/resources/static/assets/excelFiles/"
    let path =
    fullPath + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      rows.shift();
      rows.shift();
      rows.shift();
      let degrees = [];

      rows.forEach((row) => {

        
        let degree = {
          student_Id: row[3],
          arabic_degre: row[4],
          dain_degre: row[5],
          math_degre: row[6],
          scince_degre: row[7],
          social_degre: row[8],
          english_degre: row[9],
          maharat_degre: row[10],
          tocnolegy_degre: row[11],
          badania_degre: row[12],
          general_degre: row[13],
          sort_code: row[14],
          test_kind_Id: row[15],
          grade_Id: row[16],
          french_degre: row[17],
          show_data: row[19],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      

        degrees.push(degree);
      });
      Degree.bulkCreate(degrees)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.filename,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
          console.log(error);
        })
  }).then(async ()=>{
     // Delete the file like normal
     await unlinkAsync(path)
  })
 
  }
   catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.filename,
    }).then(async ()=>{
      // Delete the file like normal
      await unlinkAsync(path)
   })
  }
};


const upload_mark = async (req, res) => {
  
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!")
    }
    let fullPath = __basedir + "/resources/static/assets/excelFiles/"
    let path =
    fullPath + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      rows.shift();
      rows.shift();
      rows.shift();
      let marks = [];

      rows.forEach((row) => {

        
        let mark = {
          student_Id: row[3],
          arabic_degre: row[4],
          dain_degre: row[5],
          math_degre: row[6],
          scince_degre: row[7],
          social_degre: row[8],
          english_degre: row[9],
          maharat_degre: row[10],
          tocnolegy_degre: row[11],
          badania_degre: row[12],
          general_degre: row[13],
          sort_code: row[14],
          test_kind_Id: row[15],
          grade_Id: row[16],
          show_data: row[19],
          french_degre: row[17],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      

        marks.push(mark);
      });
      Mark.bulkCreate(marks)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.filename,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
          console.log(error);
        })
  }).then(async ()=>{
     // Delete the file like normal
     await unlinkAsync(path)
  })
 
  }
   catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.filename,
    }).then(async ()=>{
      // Delete the file like normal
      await unlinkAsync(path)
   })
  }
};


const upload_mark2 = async (req, res) => {
  
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!")
    }
    let fullPath = __basedir + "/resources/static/assets/excelFiles/"
    let path =
    fullPath + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      rows.shift();
      rows.shift();
      rows.shift();
      let marks = [];

      rows.forEach((row) => {

        
        let mark = {
          student_Id: row[3],
          arabic_degre: row[4],
          dain_degre: row[5],
          math_degre: row[6],
          scince_degre: row[7],
          social_degre: row[8],
          english_degre: row[9],
          maharat_degre: row[10],
          tocnolegy_degre: row[11],
          badania_degre: row[12],
          general_degre: row[13],
          sort_code: row[14],
          test_kind_Id: row[15],
          grade_Id: row[16],
          french_degre: row[17],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      

        marks.push(mark);
      });
      Mark.bulkCreate(marks)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
          console.log(error);
        })
  }).then(async ()=>{
     // Delete the file like normal
     await unlinkAsync(path)
  })
 
  }
   catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    }).then(async ()=>{
      // Delete the file like normal
      await unlinkAsync(path)
   })
  }
};

const upload_phrase = async (req, res) => {
  
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!")
    }
    let fullPath = __basedir + "/resources/static/assets/excelFiles/"
    let path =
    fullPath + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      let phrases = [];

      rows.forEach((row) => {

        
        let phrase = {
          general_desc: row[0],
          general_degre: row[1],
          test_kind_Id: row[2],
          grade_Id: row[3],
        };
      

        phrases.push(phrase);
      });
      Phrase.bulkCreate(phrases)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.filename,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
          console.log(error);
        })
  }).then(async ()=>{
     // Delete the file like normal
     await unlinkAsync(path)
  })
 
  }
   catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.filename,
    }).then(async ()=>{
      // Delete the file like normal
      await unlinkAsync(path)
   })
  }
};


 /* let phrase = {
          tocnolegy_desc: row[0],
          tocnolegy_degre: row[1],
            test_kind_Id: row[2],
            grade_Id: row[3],
        }; */

const getTArabic = (req, res) => {
  Student.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const getUsers= async (req,res)=>{
  try{
    const student = await Student.destroy(
      {where:{grade_Id:3},
    })
    res.status(200).json(student)
  }catch(err){
    res.status(500).json({ message: err })
    console.log("Error", err)
  }

      
}

module.exports = {
  upload_student,
  upload_degree,
  upload_mark,
  upload_phrase,
  getTArabic,
  getUsers,
};
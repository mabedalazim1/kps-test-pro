const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/excelFiles/");
  },
  
  fileFilter : (req, file, cb) => {
    // fix problem can't save arabic strings
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    console.log(file.originalname)
    cb(null, true);
}
});

const uploadExcelFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadExcelFile;
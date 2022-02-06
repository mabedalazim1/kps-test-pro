
const multer = require('multer'); 

const storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './public/static/uploads/images');  
    }, 
    
  filename: function (req, file, callback) {  
    callback(null, file.originalname);  
  }  
});  

const upload = multer({ storage : storage}).single('myfile');  
  
module.exports = upload
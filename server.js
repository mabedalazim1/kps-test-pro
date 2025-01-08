const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require('path')
global.__basedir = __dirname;

// bodyParser application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors & morgan
app.use(cors());
app.use(morgan('dev'));

// Auth Router
require('./src/routes/auth.routes')(app);

// User Router
require('./src/routes/user.routes')(app);

// Static Files
app.use('/api', express.static(path.join(__dirname, 'public')))

// Const All Routes
const header = require("./src/routes/header");
const initRoutes = require("./src/routes");

header(app);
initRoutes(app);



// CURD Routers
const curdRrouter = require("./src/routes/curdRouter");
app.use('/api/', curdRrouter.imagesection);
app.use('/api/', curdRrouter.imageCatogery);
app.use('/api/', curdRrouter.imageData);

// Const Port
const port = process.env.PORT || 8080

// Sequelize
const db = require('./config/database');
const sql = require('./src/models');
//const sudentSql = require('./src/models/school.model');
const courseSql = require('./src/models/courses.model')
const modifaySequelize = async () => {
  try {
    
    //await sql.creatSqlData()
    //await sql.initial()

    // School data
    //await sudentSql.creatSqlStudentData()
    //await sudentSql.initialSchoolData()

    // course data
    //await courseSql.creatSqlCoursestData()
    //await courseSql.initialCoursesData()

    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
modifaySequelize()

// Handel route Error
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



app.listen(port, () => console.log(`app is running on ${port}`))
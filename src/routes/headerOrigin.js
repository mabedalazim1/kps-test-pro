const headerOrgin = (app) => {
    app.use((req, res, next) =>{
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    
}

module.exports = headerOrgin
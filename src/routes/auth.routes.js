const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
    app.get('/api/auth/signup',(req,res)=>{res.send('Ok Mohamed')})
    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/osrasingin", controller.osraSingin);
};
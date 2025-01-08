// Set Access token
const header = (app) => {
    app.use((req, res, next) =>{
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  });
}

module.exports = header;
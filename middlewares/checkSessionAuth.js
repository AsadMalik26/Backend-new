function checkSessionAuth(req, res, next) {
  //set variable for every pug file
  if (req.session.user) next();
  else {
    console.log("Check Auth fialed");
    res.send("Check Auth failed");
  }
}

module.exports = checkSessionAuth;

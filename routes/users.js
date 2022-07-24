var express = require("express");
var router = express.Router();
var User = require("../databaseModels/usersModel");

// a variable to save a session
var session = {};

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("Users");
  console.log("Request: ", req.body);

  session = req.session;
  if (session) {
    console.log("Session userid: ", session.userid);
    console.log("Session id: ", session.id);
    console.log("Session Cookie: ", session.cookie);
    console.log("Session: ", session);
  } else console.log("Session Not found: ", session);
  res.send(session);
});
//register
router.post("/register", async function (req, res, next) {
  var status = "User Pending";
  try {
    var user = new User(req.body);
    await user.save();
    status = "User Registered";
  } catch {
    var status = "Error Registering User";
  }
  console.log(status);
  res.send(status);
});
router.post("/login", async function (req, res, next) {
  var status = "User Pending";
  try {
    var user = await User.findOne({
      // name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      status = "User Found";
      // console.log("USer: ", user);

      session = req.session;
      session.userid = req.body.email;
      console.log(req.session);
      console.log("Session: ", session);
      console.log("Session user id: ", session.userid);
      console.log("Session id: ", session.id);

      req.cookies = session.userid;
      res.cookies = session.userid;
    } else status = "Not a User";
  } catch (e) {
    var status = "Error Finding User" + e;
  }
  console.log(status);
  res.send(status);
});

module.exports = router;

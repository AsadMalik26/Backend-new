var express = require("express");
var router = express.Router();
var { userModel } = require("../databaseModels/usersModel");
const isAlreadyUser = require("../middlewares/isAlreadyUser");
const bcrypt = require("bcryptjs");
// a variable to save a session
var session;
/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("Users");
  console.log("Request: ", req.body);

  session = req.session;
  if (session.id) {
    console.log("Session userid: ", session.userid);
    console.log("Session id: ", session.id);
    console.log("Session Cookie: ", session.cookie);
    console.log("Session: ", session);
  } else console.log("Session Not found: ", session);
  res.send(session);
});
//register
router.post("/register", isAlreadyUser, async function (req, res, next) {
  var status = "User Pending";

  try {
    var user = new userModel();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    status = "User Registered";
  } catch {
    var status = "Error Registering User";
  }
  console.log(status);
  console.log(user);
  res.send(status);
});
router.post("/login", async function (req, res, next) {
  var status = "User Pending";
  try {
    var user = await userModel.findOne({
      // name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      status = [true, "Found User"];
      // console.log("USer: ", user);

      session = req.session;
      session.userid = req.body.email;
      console.log(req.session);
      console.log("Session: ", session);
      console.log("Session user id: ", session.userid);
      console.log("Session id: ", session.id);

      req.cookies = session.userid;
      res.cookies = session.userid;
    } else status = [false, "Not a User"];
  } catch (e) {
    var status = "Error Finding User" + e;
  }
  console.log(status);
  res.send(status);
});

module.exports = router;

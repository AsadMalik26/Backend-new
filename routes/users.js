var express = require("express");
var router = express.Router();
var { userModel } = require("../databaseModels/usersModel");
const isAlreadyUser = require("../middlewares/isAlreadyUser");
const _ = require("lodash");
const isUser = require("../middlewares/isUser");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/isAdmin");

// a variable to save a session
var session;
/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("Users");
  console.log("Request: ", req.body);

  /*  session = req.session;
  if (session.userid) {
    console.log("Session userid: ", session.userid);
    console.log("Session id: ", session.id);
    console.log("Session Cookie: ", session.cookie);
    console.log("Session: ", session);
  } else console.log("Session Not found: ", session); */

  res.cookie("Name", "This is the cookie", { maxAge: 60000 }).send(session);
});
//register
router.post("/register", isAlreadyUser, async function (req, res, next) {
  var status = "User Pending";

  try {
    var user = new userModel();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.generateHashedPassword();
    await user.save();
    status = "User Registered";
  } catch {
    var status = "Error Registering User";
  }
  console.log(status);
  console.log(_.pick(user, ["name", "email"]));
  res.send(status);
});
router.post("/login", isUser, async function (req, res, next) {
  var status = "User Pending";
  console.log(
    "From previous middleware (user): ",
    _.pick(req.user, ["name", "email"])
  );

  status = [true, "Found User"];

  let token = jwt.sign(
    { _id: req.user._id, name: req.user.name },
    config.get("jwtprivatekey")
  );
  res.set("user-auth-token", token);
  //login cookie
  req.cookies.login = token;
  console.log("Cookie Token: ", req.cookies.login);

  session = req.session;
  session.userid = req.body.email;
  console.log(req.session);

  req.cookies = session.userid;
  //   } else status = [false, "Not a User"];
  // } catch (e) {
  //   var status = "Error Finding User" + e;
  // }
  console.log("Status: ", status);
  console.log("Req.cookies: ", req.cookies);
  res.cookie("name", "express");
  res.send(status);
});

module.exports = router;

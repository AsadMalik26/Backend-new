var express = require("express");
var router = express.Router();
var User = require("../databaseModels/usersModel");
/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("Users");
  console.log("Request: ", req.body);
  res.send("respond with a resource");
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
      console.log("USer: ", user);
    } else status = "Not a User";
  } catch (e) {
    var status = "Error Finding User" + e;
  }
  console.log(status);
  res.send(status);
});

module.exports = router;

const { userModel } = require("../databaseModels/usersModel");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
async function isUser(req, res, next) {
  var user = await userModel.findOne({ email: req.body.email });
  console.log("Middleware check user: ", user);
  // console.log("Middleware check user: ", _.pick(user, ["name", "email"]));
  if (!user) {
    var status = [false, "User Not registered"];
    console.log(status);
    return res.status(400).send(status);
  }

  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Passsword");
  req.user = user;
  next();
}

module.exports = isUser;

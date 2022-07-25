const { userModel } = require("../databaseModels/usersModel");
const _ = require("lodash");

async function isAlreadyUser(req, res, next) {
  console.log("Middleware check: ", req.body);
  var user = await userModel.findOne({ email: req.body.email });
  console.log("Middleware check user: ", _.pick(user, ["name", "email"]));
  if (user) {
    let status = [false, "User already exist"];
    console.log(status);
    return res.status(400).send(status);
  } else console.log("New User");
  next();
}

module.exports = isAlreadyUser;

const jwt = require("jsonwebtoken");
const config = require("config");
const { userModel } = require("../databaseModels/usersModel");
async function auth(req, res, next) {
  console.log("Checking Auth");
  let token = req.header("user-auth-token");
  if (!token) return res.status(400).send("Invalid user");
  req.token = token;

  try {
    let user = await jwt.verify(token, config.get("jwtprivatekey"));
    req.user = await userModel.findById(user._id);
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  next();
}
module.exports = auth;

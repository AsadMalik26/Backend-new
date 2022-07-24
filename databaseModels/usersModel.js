const mongoose = require("mongoose");

/* const spentAtSchema = mongoose.Schema({
  title: String, //cash spent for
  price: float,
  date: { type: Date, default: Date.now, index: true },
});
 */

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
//sign up validation
function validateUserSignup(data) {
  console.log("Validating User Login");
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(12).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
//login validation
function validateUserLogin(data) {
  console.log("Validating User Login");
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(12).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

const userModel = mongoose.model("user", userSchema);

module.exports.userModel = userModel;
module.exports.validateUserSignup = validateUserSignup;
module.exports.validateUserLogin = validateUserLogin;

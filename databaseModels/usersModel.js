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

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;

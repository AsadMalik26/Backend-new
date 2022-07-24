const mongoose = require("mongoose");
const Joi = require("joi");
/* const spentAtSchema = mongoose.Schema({
  title: String, //cash spent for
  price: float,
  date: { type: Date, default: Date.now, index: true },
});
 */

const cashSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: {
    type: String,
    default: null,
  },
});

function validateProduct(data) {
  console.log("Validating");
  const schema = Joi.object({
    title: Joi.string().min(3).max(25).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}

const cashModel = mongoose.model("cashModel", cashSchema);

module.exports.cashModel = cashModel;
module.exports.validateProduct = validateProduct;

const { validateProduct } = require("../databaseModels/dbmodels");

function validate(req, res, next) {
  //Validation
  let obj = req.body;
  console.log(obj);
  var { error } = validateProduct(obj);
  if (error) {
    console.log("Not Valid: ", error.message);
    return res.status(400).send(error.message);
  } else {
    console.log("Validation OK: ", error);
    next();
  }
}

module.exports = validate;

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  console.log("ID: ", req.session.id);
  res.render("index", { title: "Express" });
});
router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.send(cart);
});

module.exports = router;

var express = require("express");
const cashModel = require("../databaseModels/dbmodels");
var router = express.Router();

//get cart
router.get("/", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.send(cart);
});

//add to cart
router.post("/:id", async (req, res) => {
  try {
    var entry = await cashModel.findById(req.params.id);
    var cart = [];
    if (req.cookies.cart) cart = req.cookies.cart;
    cart.push(entry);
    res.cookie("cart", cart);
    // 1st is variable name, 2nd is cart which contains data of variable

    console.log("Product added in cart");
  } catch {
    entry = "Product can't be added in cart";
  }
  console.log(entry);
  res.send(entry);
});

//remove from cart
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    var cart = [];
    var n = 0; //no of delete
    if (req.cookies.cart) cart = req.cookies.cart;
    cart.splice(
      cart.findIndex((c) => {
        if (c._id == req.params.id) {
          console.log("Remove cart: ", c);
          console.log("Product Removed from cart");
          n = 1;
          return c._id;
        } else n = 0;
      }),
      0
    );
    res.cookie("cart", cart);
    // 1st is variable name, 2nd is cart which contains data of variable
  } catch {
    console.log("Product can't be removed from cart");
  }

  res.send(cart);
});

module.exports = router;

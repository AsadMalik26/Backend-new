const express = require("express");
const router = express.Router();

// app.use(cors());
const {
  createEntry,
  getAllEntries,
  getOneEntry,
  deleteEntry,
  updateEntry,
} = require("../databaseOperations/modelOperations");
const cashModel = require("../databaseModels/dbmodels");

//read or fetch requests
router.get("/", async (req, res) => {
  console.log("Get All");
  try {
    var e = await getAllEntries();
  } catch {
    console.log("No Products");
    e = "No Product(s) available";
  }
  res.send(e);
});
//fetch single product
router.get("/:id", async (req, res) => {
  console.log("Get One");

  try {
    var e = await getOneEntry(req.params.id);
  } catch {
    console.log("Product Not Found");
    e = "No Product(s) available";
  }

  res.send(e);
});

//Post - create request
router.post("/", async (req, res) => {
  //1st is starting index, 2nd is no. of records to be deleted. here the only one itself
  /* food.push(req.body.name);
  res.send(food); */
  var obj = req.body;
  console.log("Posting: ", obj);
  var entry = await createEntry(obj.title, obj.price, obj.description);
  res.send(entry);
});

//Put - update request
router.put("/:id", async (req, res) => {
  var obj = req.body;
  console.log("Updating", obj);
  try {
    var entry = await cashModel.findById(req.params.id);
    entry.title = req.body.title;
    entry.price = req.body.price;
    entry.description = req.body.description;
    await entry.save();
    res.send(entry);
  } catch (err) {
    console.log("error occured while updating" + err.message);
    res.send("Error while updating");
  }
});

//delete request
router.delete("/:id", async (req, res) => {
  //1st is starting index, 2nd is no. of records to be deleted. here the only one itself
  /* food.splice(req.params.id, 1);
  res.send(food); */
  var entry = await deleteEntry(req.params.id);
  console.log("Deleted", entry);
  res.send(entry);
});
router.get("/cart/:id", async (req, res) => {
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

module.exports = router;

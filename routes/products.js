const express = require("express");
const router = express.Router();
const { cashModel, validateProduct } = require("../databaseModels/dbmodels");
const validate = require("../middlewares/validateProduct");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/isAdmin");
// app.use(cors());
const {
  createEntry,
  getAllEntries,
  getOneEntry,
  deleteEntry,
  updateEntry,
} = require("../databaseOperations/modelOperations");

//read or fetch requests
router.get("/", async (req, res) => {
  console.log("Get All");
  console.log("Cookies: ", req.cookies);
  // console.log(req.session); it containes session but not user id
  // console.log("Query: ", req.query);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);

  try {
    var e = await getAllEntries(skipRecords, perPage);
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
router.post("/", auth, validate, async (req, res) => {
  var obj = req.body;
  // console.log("Posting: ", obj);
  var entry = await createEntry(obj.title, obj.price, obj.description);
  res.send(entry);
});

//Put - update request
router.put("/:id", auth, admin, validate, async (req, res) => {
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
router.delete("/:id", auth, admin, async (req, res) => {
  //1st is starting index, 2nd is no. of records to be deleted. here the only one itself
  /* food.splice(req.params.id, 1);
  res.send(food); */
  var entry = await deleteEntry(req.params.id);
  console.log("Deleted", entry);
  res.send(entry);
});

module.exports = router;

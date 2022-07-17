const cashModel = require("../databaseModels/dbmodels");

const createEntry = async (title, price, description) => {
  let entry = new cashModel();
  entry.title = title;
  entry.price = price;
  entry.description = description;
  await entry.save();
  console.log("entry saved", entry);
  return entry;
};

const getAllEntries = async () => {
  let entries = await cashModel.find();
  return entries;
};

const getOneEntry = async (_id) => {
  let entry = await cashModel.findById(_id);
  return entry;
};

const deleteEntry = async (_id) => {
  let entry = await cashModel.findByIdAndDelete(_id);
  return entry;
};

const updateEntry = async (_id, title, price, description) => {
  let entry = await cashModel.findById(_id);
  entry.title = title;
  entry.price = price;
  entry.description = description;
  await entry.save();
  return entry;
};

module.exports.createEntry = createEntry;
module.exports.getAllEntries = getAllEntries;
module.exports.getOneEntry = getOneEntry;
module.exports.deleteEntry = deleteEntry;
module.exports.updateEntry = updateEntry;

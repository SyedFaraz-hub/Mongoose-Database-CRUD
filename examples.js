const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/e-comm");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const saveInDB = async () => {
  const product = mongoose.model("products", productSchema);
  const data = new product({ name: "Iphone x", price: 600 });
  const result = await data.save();
  console.log(result);
};

const updateInDB = async () => {
  const product = mongoose.model("products", productSchema);
  const result = await product.updateOne({name: "Iphone"}, {$set: {price: 10000}})
  console.log(result);
};

const deleteInDB = async () => {
  const product = mongoose.model("products", productSchema);
  const result = await product.deleteOne({name: "Iphone"})
  console.log(result);
};

const findInDB = async () => {
  const product = mongoose.model("products", productSchema);
  const result = await product.find({name: "Iphone"})
  console.log(result);
};





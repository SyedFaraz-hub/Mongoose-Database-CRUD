const express = require("express");
const multer = require("multer")
require("./config");
const product = require("./product");

const app = express();
app.use(express.json());


// CRUD 
app.post("/create", async (req, resp) => {
  const data = new product(req.body);
  const result = await data.save();
  resp.send(result);
});

app.get("/list", async (req, resp) => {
  const result = await product.find();
  resp.send(result);
});

app.put("/update/:_id", async (req, resp) => {
  const result = await product.updateOne(
    { _id: req.params._id },
    { $set: req.body }
  );
  resp.send(result);
});

app.delete("/delete/:_id", async (req, resp) => {
  const result = await product.deleteOne({ _id: req.params._id });
  resp.send(result);
});


// SEARCHING
app.get("/search/:key", async (req, resp) => {
  const result = await product.find({
    '$or': [
      { 'name': { $regex: req.params.key} },
    ],
  });
  resp.send(result);
});


// FILE UPLOAD
const upload = multer({
  storage: multer.diskStorage({
    destination:  function(req,file, cb) {
      cb(null, 'uploads')
    },
   filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg")
   }
  })
}).single("user_file")


app.post('/upload', upload ,(req,resp)=>{
  resp.send("file uploaded")
}) 





app.listen(5000);

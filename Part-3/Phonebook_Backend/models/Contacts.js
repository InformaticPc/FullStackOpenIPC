const mongoose = require("mongoose");

// URL-String
const url = process.env.MONGODB_URI;

// ---------CONNECTING DB---------
mongoose.set("strictQuery", false);
mongoose
  .connect(url, { family: 4 })

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// ---------Mongoose Schema---------
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// ---------Modify Mongo Schema---------
// remove the properties that you don't want to see in you DB

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
// ---------Mongoose Model---------
module.exports = mongoose.model("Contact", contactSchema);

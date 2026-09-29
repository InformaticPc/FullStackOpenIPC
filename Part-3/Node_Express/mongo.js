const mongoose = require("mongoose");
console.log("process argv: ", process.argv);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://informaticpc07_db_user:${password}@ac-ij3xoxb-shard-00-00.ljy8u8p.mongodb.net:27017,ac-ij3xoxb-shard-00-01.ljy8u8p.mongodb.net:27017,ac-ij3xoxb-shard-00-02.ljy8u8p.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-zwn3nr-shard-0&authSource=admin&appName=Cluster0`;
mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

require("dotenv").config(); //<-- being the first line, env will be imported before the rest of modules are called, so they will have access to en 'ENV' variables too ⚠️
const express = require("express");
const app = express();
// ---------MONDODB---------
const Note = require("./models/notes");

// ---------DATA---------
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.use(express.static("dist/"));

app.use(express.json()); // <== Middleware Parse the request content (json ) to a JavaScript Object and assign it to a request object as new property body.

// ---------ROOT PAGE---------
app.get("/", (request, response) => {
  // response.send(notes);
  response.send(
    "<h1 class='a_class otherclass'>IPC, Can send HTML even with attributes </h1>"
  );
});

// ---------GET NOTES---------
app.get("/api/notes", (request, response) => {
  // console.log("REQUEST HEADERS: ", request.headers);
  // console.log("================\n==============");
  // console.log("REQUEST BODY: ", request.body);
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// ---------DELETE---------
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});
// ---------PUT---------
app.put("/api/notes/:id", (request, response) => {
  const noteUpdated = request.body; //<== {content: 'whatever', important:'!true', id:'id'}
  notes = notes.map(
    (note) => (note.id === noteUpdated.id ? noteUpdated : note) // <== this updates the database
  );
  response.json(noteUpdated); // this return the object as the response of 'axios' request (/h/Documents/Aday/INFORMATIC/FullStackOpen/Part-2/Form/src/services/note.js)
});

// ---------POST---------
// const generateID = (array) => {
//   const maxID =
//     array.length > 0 ? Math.max(...array.map((n) => Number(n.id))) : 0;
//   return String(maxID + 1); // add➕ property id and rise by 1* the bigger ID in 'notes'
// };

app.post("/api/notes", (request, response) => {
  const body = request.body;
  console.log("BODY?: ", body);
  if (!body.content) {
    return response.status(400).json({ error: "'content' property missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false, //if we miss important property, we'll set it 'false' by default
  });
  console.log("NEW NOTE: ", note); //check..
  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// another Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// ---------LISTEN PORT---------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db

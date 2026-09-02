const express = require("express");
const app = express();
// const morgan = require("morgan");

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
console.log("WHAT IS APP;", app);

// -------MIDDLEWARES-------
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(express.static("dist"));

app.use(express.json()); // <== Middleware Parse the request content (json ) to a JavaScript Object and assign it to a request object as new property body.

app.use(requestLogger);

// ---------GET---------
app.get("/", (request, response) => {
  // console.log("REQUEST", request);
  console.log("================\n==============");
  // console.log("WHAT IS express;", express);
  // console.log("RESPONSE", response);
  // response.send("Hi INFORMATIC-PC  out");
  // response.send(notes);
  response.send(
    "<h1 class='a_class otherclass'>IPC, Can send HTML even with attributes </h1>"
  );
});

app.get("/api/notes", (request, response) => {
  console.log("================\n==============");
  console.log("REQUEST HEADERS: ", request.headers);
  console.log("================\n==============");
  console.log("REQUEST BODY: ", request.body);
  // console.log("WHATS ID:", id);

  response.json(notes);

  // console.log("RESPONSE", response);
});
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  console.log("================\n==============");
  // console.log("WHATS ID:", id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.statusMessage = "Note doesn't exist";
    response.status(404).end();
  }
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
const generateID = (array) => {
  const maxID =
    array.length > 0 ? Math.max(...array.map((n) => Number(n.id))) : 0;
  return String(maxID + 1); // add➕ property id and rise by 1* the bigger ID in 'notes'
};

app.post("/api/notes", (request, response) => {
  const body = request.body;
  console.log("BODY?: ", body);
  if (!body.content) {
    return response.status(400).json({ error: "'content' property missing" });
  }

  const note = {
    content: body.content,
    important: body.important || false, //if we miss important property, we'll set it 'false' by default
    id: generateID(notes),
  };
  console.log("NEW NOTE: ", note); //check..
  notes = notes.concat(note);

  response.json(note);
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
// https://fullstackopen.com/en/part3/deploying_app_to_internet#streamlining-deploying-of-the-frontend
//How can I make the POST method to work without [Middleware 'express.json()']

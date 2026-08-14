const express = require("express");
const app = express();

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.end(`Phonebook had info for ${persons.length} people\n\n${Date()}`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log("show ID: ", id);
  const contact = persons.find((person) => {
    // console.log("show Person: ", person, person.id);
    return person.id === id;
  });
  // console.log("Whats Contact?: ", contact);
  if (contact) response.json(contact);
  else {
    response.statusMessage = `Note with id:${id} doesn't exist`;
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6

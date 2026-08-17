const express = require("express");
const app = express();

let persons = [
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
// ---------GET ROOT---------
app.get("/", (request, response) => {
  response.end(`Phonebook had info for ${persons.length} people\n\n${Date()}`);
});

// ---------GET CONTACTS---------
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const contact = persons.find((person) => {
    return person.id === id;
  });
  if (contact) response.json(contact);
  else {
    response.statusMessage = `Note with id:${id} doesn't exist`;
    response.status(404).end();
  }
});
// ---------DELETE CONTACT---------
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id != id);
  response.statusMessage = "Note removed";
  response.status(204).end();
});
// ---------POST NEW CONTACT---------
app.use(express.json());
app.post("/api/persons", (request, response) => {
  let newID;
  let idFound;
  const content = request.body;
  // ℹ️ do while loop for random ID to make sure it doesn't repeat, for at least 20 contacts, then it would be an infinity loop❌
  console.log("POST CONTENT: ", content);
  do {
    newID = parseInt(Math.random() * 20 + 1); //only int numbers and avoiding '0'
    console.log("ID: ", newID);
    idFound = persons.find((person) => {
      return person.id === String(newID);
    });
    console.log("idFound: ", idFound);
  } while (idFound);

  // contact structure
  const newContact = {
    id: String(newID),
    name: content.name || "n/a",
    number: content.number || "n/a",
  };
  console.log("new Contact: ", newContact);
  persons = persons.concat(newContact);
  response.json(newContact);
  response.statusMessage = "New contact added"; //it doesn't have any effect
  response.status(201).end(); // this also change
});

// ---------PORT---------
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6
// 3.5: Phonebook backend step 5 <==

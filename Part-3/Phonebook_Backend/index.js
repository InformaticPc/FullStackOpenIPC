require("dotenv").config();
const express = require("express");
const app = express();
const Contact = require("./models/Contacts");
/*
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
*/
// ---------use dist dir---------
app.use(express.static("dist/"));

// ---------MIDDLEWARE---------
app.use(express.json());

// ---------GET ROOT---------
app.get("/", (request, response) => {
  response.end(`Phonebook had info for ${persons.length} people\n\n${Date()}`);
});

// ---------GET CONTACTS---------
app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    console.log("Contacts: ", contacts);
    response.json(contacts);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((contact) => {
      response.json(contact);
    })
    .catch((reason) => {
      response.statusMessage = reason;
      response.status(404).end();
    });
});
/*
// ---------DELETE CONTACT---------
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id != id);
  response.statusMessage = "Note removed";
  response.status(204).end();
});
*/
// ---------POST NEW CONTACT---------
app.post("/api/persons", (request, response) => {
  const content = request.body;
  // ------ERROR HANDLER------
  // property 'name' OR 'number' is empty
  if (!content.name || !content.number) {
    return response
      .status(400)
      .json({ error: "'name' or 'number property missing" });
  }
  console.log("CONTECT.NAME:", content.name);
  console.log("CONTECT.NUMBER:", content.number);

  // contact structure
  const newContact = new Contact({
    name: content.name,
    number: content.number || "n/a",
  });
  newContact.save().then((savedContact) => {
    console.log("Contact saved", savedContact);
    response.json(savedContact);
  });
  response.statusMessage = "New contact added"; //it doesn't have any effect
  response.status(201).end(); // this also change
});

// ---------PORT---------
const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

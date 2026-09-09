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

app.post("/api/persons", (request, response) => {
  let newID;
  let idFound;
  const content = request.body;
  // ------ERROR HANDLER------
  // property 'name' OR 'number' is empty
  if (!content.name || !content.number) {
    return response
      .status(400)
      .json({ error: "'name' or 'number property missing" });
  }
  // property value 'number' OR 'name' already exist
  const numExist = persons.find((person) => {
    return person.number == content.number || person.name == content.name;
  });
  if (numExist) {
    return response.status(400).json({ error: "Number or name already exist" });
  }
  // ℹ️ do while loop for random ID to make sure it doesn't repeat, for at least 20 contacts, then it would be an infinity loop❌
  console.log("POST CONTENT: ", content);
  do {
    newID = parseInt(Math.random() * 20 + 1); //only int numbers and avoiding '0'
    console.log("ID: ", newID);
    idFound = persons.find((person) => {
      return person.id === String(newID);
    });
    console.log("ID already exist: ", idFound);
  } while (idFound);

  // contact structure
  const newContact = {
    id: String(newID),
    name: content.name,
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

// https://fullstackopen.com/en/part3/deploying_app_to_internet#exercises-3-9-3-11
// STEP 10 AND 11 do it together, since you did the 'build' dist/ of you app already. You coudln't make the app to work from backend using Morgan middleware. ⁉️Check this in the future 'HOW MIDDLEWARE ARE USED TO CONNECT BACKEND WITH FRONTEND'⁉️

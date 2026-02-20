import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import dataContacts from "./services/contacts";
import "./App.css";

const App = () => {
  // ========States========
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // ========UseEffect========
  const hook = () => {
    dataContacts.getAll().then((contacts) => setPersons(contacts));
  };
  useEffect(hook, []); // see clearly 2 args...

  // ========Filter========
  /**
   * Render only the matches
   */
  const filtered =
    search == ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().match(search.toLowerCase())
        );

  // ========handlers========
  const handleName = (e) => setNewName(e.target.value);
  const handlerNumber = (e) => setNewNumber(e.target.value);

  /**
   * Starts the search for matches in substrings
   * @param {EventSource} e
   */
  const handlerSearch = (e) => {
    setSearch(e.target.value);
  };

  // ========handler DELETE========
  function handlerDel(person) {
    const confirmDel = window.confirm(
      `Do you want to delete ${person.name} contact?`
    );

    if (confirmDel) {
      dataContacts
        .delContact(person.id)
        .finally(() =>
          setPersons(persons.filter((contact) => contact.id !== person.id))
        );
      // return the new list of contact by filtering ☝️
    } else alert(`Contact ${person.name} NOT deleted`);
  }

  // ========button SUBMIT========
  const handlerSubmit = (e) => {
    e.preventDefault(); // <== REMEMBER
    let isAdded = false;
    const newPerson = { name: newName, number: newNumber };
    let toReplace;
    let personID;
    persons.forEach((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) {
        personID = person.id;
        isAdded = true;
      }
    });
    // ========Update contact========
    if (isAdded) {
      toReplace = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (toReplace) {
        dataContacts.update(personID, newPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === personID ? response : person
            )
          );
        });
      }
    }
    // ========NEW contact========
    else
      dataContacts
        .create(newPerson)
        .then((person) => setPersons(persons.concat(person)));

    setNewName("");
    setNewNumber("");
    console.log("list:", persons);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Filter search={handlerSearch} />
      <h2>Add a new</h2>
      <PersonForm
        name={handleName}
        number={handlerNumber}
        submit={handlerSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} handlerDel={handlerDel} />
    </>
  );
};

export default App;
// Adding styles to React app
//https://fullstackopen.com/en/part2/adding_styles_to_react_app

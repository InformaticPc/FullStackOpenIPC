import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import dataContacts from "./services/contacts";
import "./App.css";

const App = () => {
  // --------States--------
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  console.log("newName:", newName);

  // --------UseEffect--------
  const hook = () => {
    dataContacts.getAll().then((contacts) => setPersons(contacts.data));
  };
  useEffect(hook, []); // see clearly 2 args...

  // --------Filter--------
  /**
   * Render only the matches
   */
  const filtered =
    search == ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().match(search.toLowerCase())
        );

  // --------handlers--------
  const handleName = (e) => setNewName(e.target.value);
  const handlerNumber = (e) => setNewNumber(e.target.value);

  /**
   * Starts the search for matches in substrings
   * @param {EventSource} e
   */
  const handlerSearch = (e) => {
    setSearch(e.target.value);
  };
  // button
  const handlerSubmit = (e) => {
    e.preventDefault(); // <== REMEMBER
    let isAdded = false;
    const newPerson = { name: newName, number: newNumber };
    persons.forEach((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) isAdded = true;
    });
    isAdded
      ? alert(`${newName} is already added to the phonebook`)
      : dataContacts
          .create(newPerson)
          .then((person) => setPersons(persons.concat(person.data)));

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
      <Persons persons={filtered} />
    </>
  );
};

export default App;
// 2.10: The Phonebook Step 5
//https://fullstackopen.com/en/part2/forms#controlled-component

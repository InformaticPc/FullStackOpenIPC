import { useState } from "react";

const App = () => {
  // --------States--------
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // --------const--------
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
    persons.forEach((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) isAdded = true;
    });
    isAdded
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form>
        <div>
          Filter shown with: <input type="text" onKeyUp={handlerSearch} />
        </div>
        <h2>Add a new</h2>
        <div>
          Name: <input type="text" onChange={handleName} />
        </div>
        <div>
          Number: <input type="text" onChange={handlerNumber} />
        </div>
        <div>
          <button onClick={handlerSubmit} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map((person, index) => (
        <p key={index}>
          {" "}
          {person.name} {person.number}
        </p>
      ))}
      <>
        <br />
      </>
      <>debug name: {newName}</>
      <br />
      <>debug number: {newNumber}</>
      <br />
      <>debug search: {search}</>
    </>
  );
};

export default App;
// 2.7: The Phonebook Step 2
//https://fullstackopen.com/en/part2/forms#controlled-component

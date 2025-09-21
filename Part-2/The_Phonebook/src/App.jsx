import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // handlers
  const handleInput = (e) => setNewName(e.target.value);
  const handlerSubmit = (e) => {
    e.preventDefault(); // <== REMEMBER
    let isAdded = false;
    persons.forEach((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) isAdded = true;
    });
    isAdded
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat({ name: newName }));
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input onChange={handleInput} />
        </div>
        <div>
          <button onClick={handlerSubmit} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}> {person.name}</p>
      ))}
      <>
        <br />
      </>
      <div>debug: {newName}</div>
    </>
  );
};

export default App;
// 2.7: The Phonebook Step 2
//https://fullstackopen.com/en/part2/forms#controlled-component

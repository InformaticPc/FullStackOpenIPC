import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // handlers
  const handleInput = (e) => setNewName(e.target.value);
  const handlerSubmit = (e) => {
    e.preventDefault(); // <== REMEMBER
    setPersons(persons.concat({ name: newName }));
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleInput} />
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
      hi ...
      <div>debug: {newName}</div>
    </>
  );
};

export default App;
// 2.6: The Phonebook Step 1
//https://fullstackopen.com/en/part2/forms#controlled-component

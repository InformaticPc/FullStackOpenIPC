import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  // ---------STATES---------
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  // ---------LOGS---------
  console.log("notes: ", notes);
  console.log("newNote: ", newNote);

  // --------- FETCH FROM SERVER ---------
  const hook = () => {
    const eventHandler = (response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
      console.log("reponse:", response);
    };

    const promise = axios.get("http://localhost:3001/notes");
    promise.then(eventHandler, (err) =>
      console.log("then(): promise rejected | err=>", err)
    );
  };
  useEffect(hook, []);

  // ---------SHOW IMPORTANT NOTES---------
  // filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  const notesToShow = showAll ? notes : notes.filter((note) => note.important); // <-- 'note.important === true'
  // ---------

  const addNote = (event) => {
    event.preventDefault(); // <-- prevent default event like refresh the page

    // create the new note
    const addNewNote = {
      id: notes.length + 1,
      content: newNote, // <-- using the state
      important: Math.random() < 0.5, // <-- true/false random num btw 0 <-> 1
    };

    setNotes(notes.concat(addNewNote)); // <-- here they used 'concat' instead of 'push'. Return a new array without modifiying any previous array
    setNewNote("");
  };
  // ---------HANDLERS---------
  const handleNoteChange = (event) => {
    console.log("event.target.value onChange= ", event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important" : "all"} notes
      </button>
      <ol>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ol>
      <form onSubmit={addNote}>
        <input
          placeholder="new note..."
          type="text"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Add new note</button>
      </form>
    </div>
  );
};

export default App;
// The development runtime environment
// https://fullstackopen.com/en/part2/getting_data_from_server

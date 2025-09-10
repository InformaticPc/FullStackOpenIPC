import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("new note...");

  console.log("note: ", notes);
  console.log("newNote: ", newNote);

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

  const handleNoteChange = (event) => {
    console.log("event.target.value= ", event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Add new note</button>
      </form>
    </div>
  );
};

export default App;

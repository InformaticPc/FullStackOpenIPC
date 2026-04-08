import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  // ---------STATES---------
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // ---------LOGS---------
  console.log("notes: ", notes);
  console.log("newNote: ", newNote);

  // --------- FETCH FROM SERVER ---------
  const hook = () => {
    noteService.getAll().then((n) => setNotes(n));
  };
  useEffect(hook, []);

  console.log("getAll:", noteService.getAll());

  // ---------SHOW IMPORTANT NOTES---------
  // filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  const notesToShow = showAll ? notes : notes.filter((note) => note.important); // <-- 'note.important === true'
  // ---------

  const addNote = (event) => {
    event.preventDefault(); // <-- prevent default event like refresh the page

    // create the new note
    const addNewNote = {
      content: newNote, // <-- using the state
      important: Math.random() < 0.5, // <-- true/false random num btw 0 <-> 1
    };

    // ---------POST and set NEW NOTES---------
    noteService
      .create(addNewNote)
      .then((response) => setNotes(notes.concat(response)));

    setNewNote("");
  };

  // ---------HANDLERS---------
  const handleNoteChange = (event) => {
    console.log("event.target.value onChange= ", event.target.value);
    setNewNote(event.target.value);
  };

  // ---------UPDATE note Importance---------
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log("note found: ", note);

    noteService
      .update(id, changedNote)
      .then((response) =>
        setNotes(notes.map((note) => (note.id === id ? response : note)))
      )
      .catch((error) => {
        setErrorMessage(
          `The note: '${note.content}' was already deleted from server\nerror: ${error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  console.log("⚠️CURRENT ERROR", errorMessage);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}> </Notification>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important" : "all"} notes
      </button>
      <ol>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
      <Footer></Footer>
    </div>
  );
};

export default App;
// Changing the Importance of Notes
// This is accomplished with the map method: <==
// https://fullstackopen.com/en/part2/adding_styles_to_react_app
/*
 */

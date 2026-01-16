import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import "./global.css";

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
    console.log(promise);

    promise.then(eventHandler, (err) =>
      console.log("then(...,err): promise rejected | err=>", err)
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

    // ---------POST NEW NOTES---------
    const posting = axios.post("http://localhost:3001/notes", addNewNote);
    console.log("posting:", posting);

    posting.then((response) => console.log("POST response:", response));
    // ------GET BACK NOTES(no needed because is react)------
    // but for practicing purposes
    posting.finally((final) => {
      console.log("final posting:", final);
      axios.get("http://localhost:3001/notes").then((response) => {
        console.log("GET RESPONSE AFTER POSTING:", response);

        setNotes(notes.concat(response.data)); // <-- here they used 'concat' instead of 'push'. Return a new array without modifiying any previous array
        setNewNote("");
      });
    });
  };
  // ---------HANDLERS---------
  const handleNoteChange = (event) => {
    console.log("event.target.value onChange= ", event.target.value);
    setNewNote(event.target.value);
  };

  // ---------ID Importance---------
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id === id ? response.data : note)));
    });
    // need to post the changes...
  };

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  );
};

export default App;
// Changing the Importance of Notes
// This is accomplished with the map method: <==
// https://fullstackopen.com/en/part2/altering_data_in_server

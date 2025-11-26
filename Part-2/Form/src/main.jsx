import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

/*const promise = axios.get("http://localhost:3001/notes");
console.log(promise);
promise.then((response) => {
  console.log("Response: ", response.data);
})*/

axios.get("http://localhost:3001/notes").then((response) => {
  console.log("response: ", response.data);

  const promise2 = axios.get("http://localhost:3001/foobar");
  console.log(promise2);
});

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
notes.fil;
ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={notes} />
);
// https://fullstackopen.com/en/part2/getting_data_from_server
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

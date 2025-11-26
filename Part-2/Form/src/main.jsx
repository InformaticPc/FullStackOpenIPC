import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

/*const promise = axios.get("http://localhost:3001/notes");
console.log(promise);
promise.then((response) => {
  console.log("Response: ", response.data);
})*/

axios.get("http://localhost:3001/notes").then((response) => {
  const data = response.data;
  console.log("response: ", response.data);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={data} />
  );
});

// https://fullstackopen.com/en/part2/getting_data_from_server
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

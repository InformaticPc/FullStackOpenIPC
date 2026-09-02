import axios from "axios";
const baseUrl = "/api/notes"; //<== made a relative url after pasting Dist to backend

const getAll = () => {
  const promise = axios.get(baseUrl);
  return promise.then((initialNotes) => initialNotes.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };

//https://fullstackopen.com/en/part3/deploying_app_to_internet
// Part-3b issue:
/*You don't have a 'put' method in you Express server (file) so is making a wrong request.
Not sure if this should happen and later they will explain...
 */

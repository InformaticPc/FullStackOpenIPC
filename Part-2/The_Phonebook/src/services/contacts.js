import axios from "axios";

const baseUrl = "http://localhost:3001/persons/";

const getAll = () =>
  axios.get(baseUrl).then((initialContacts) => initialContacts.data);

const create = (contact) =>
  axios.post(baseUrl, contact).then((response) => response.data);

const delContact = (id) => axios.delete(baseUrl + id);

const update = (id, newContact) =>
  axios.put(baseUrl + id, newContact).then((response) => response.data);

export default {
  getAll,
  create,
  delContact,
  update,
};

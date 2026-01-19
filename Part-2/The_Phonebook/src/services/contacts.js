import axios from "axios";

const baseUrl = "http://localhost:3001/persons/";

const getAll = () => axios.get(baseUrl);
const create = (contact) => axios.post(baseUrl, contact);
const delContact = (id) => axios.delete(baseUrl + id);

export default {
  getAll,
  create,
  delContact,
};

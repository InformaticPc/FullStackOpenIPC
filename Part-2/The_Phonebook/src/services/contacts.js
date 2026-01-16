import axios from "axios";

const baseUrl = "http://localhost:3001/persons/";

const getAll = () => axios.get(baseUrl);
const create = (contact) => axios.post(baseUrl, contact);

export default {
  getAll,
  create,
};

import axios from "axios";
const baseUrl = "/api/blogs";
import storageService from '../services/storage'

const headers = {
  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject, { headers });
  return request.data;
};

const like = async (newObject) => {
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return request.data;
};

const deleteById = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

export default { getAll, create, like, deleteById };

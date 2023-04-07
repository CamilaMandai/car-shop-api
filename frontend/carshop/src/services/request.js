import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

export default api;
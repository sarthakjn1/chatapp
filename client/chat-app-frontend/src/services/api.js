import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const sendMessage = (message) => api.post('/message/send', message);
export const uploadFile = (file) => api.post('/file/upload', file);

export default api;
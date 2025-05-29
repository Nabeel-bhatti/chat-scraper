import axios from 'axios';
const token = localStorage.getItem('token');
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api/';
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
});

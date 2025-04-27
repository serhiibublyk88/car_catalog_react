import axios from 'axios';
import { toast } from 'react-toastify';

export const apiClient = axios.create({
  baseURL: 'http://localhost:4200',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || 'Fehler beim Verarbeiten der Anfrage';
    toast.error(message);
    return Promise.reject(error);
  }
);

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4200',
  headers: {
    'Content-Type': 'application/json',
  },
});

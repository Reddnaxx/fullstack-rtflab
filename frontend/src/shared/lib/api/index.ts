import axios from 'axios';

import { handleAPIError } from '@/entities/error/api';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => handleAPIError(error)
);

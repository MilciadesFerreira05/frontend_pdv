import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Asegúrate de que esta URL apunte a tu API de Spring Boot
});

export default api;

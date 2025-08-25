import axios from 'axios';

const externalApiClient = axios.create({
  baseURL: 'https://benin-luxe-cajou-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default externalApiClient;

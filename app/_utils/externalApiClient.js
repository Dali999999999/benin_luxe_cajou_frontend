import axios from 'axios';

const API_BASE_URL = 'http://69.62.106.46/api';

const externalApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default externalApiClient;

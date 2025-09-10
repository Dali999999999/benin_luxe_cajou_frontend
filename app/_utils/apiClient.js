import axios from 'axios';
import { authCookies } from './cookieManager';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:5000');

// 1. Création de l'instance Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Important pour envoyer les cookies
});

// 2. Intercepteur pour ajouter le token d'accès à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = authCookies.getAccessToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Intercepteur pour gérer les erreurs 401 et rafraîchir le token
apiClient.interceptors.response.use(
  (response) => response, // Si la requête réussit, on ne fait rien
  async (error) => {
    const originalRequest = error.config;

    // On vérifie si l'erreur est une 401 et qu'on n'a pas déjà réessayé
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // On marque la requête pour éviter les boucles

      try {
        const refreshToken = authCookies.getRefreshToken();
        if (!refreshToken) {
          // Si pas de refresh token, on ne peut rien faire, on déconnecte.
          console.error("Refresh token manquant, déconnexion.");
          authCookies.clearAll();
          window.location.href = '/sign-in';
          return Promise.reject(error);
        }

        // Appel à l'API pour obtenir un nouveau token d'accès
        const refreshUrl = typeof window !== 'undefined' ? `${API_BASE_URL}/auth/refresh` : 'http://127.0.0.1:5000/auth/refresh';
        const response = await axios.post(
          refreshUrl, // Endpoint de refresh
          {},
          { 
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true // Important pour recevoir les nouveaux cookies
          }
        );

        const { access_token } = response.data;

        // On met à jour le nouveau token dans les cookies
        authCookies.setTokens(access_token, refreshToken);

        // On met à jour le header de la requête originale et on la relance
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Si le refresh token est lui-même invalide, on déconnecte.
        console.error("Session expirée, déconnexion requise.");
        authCookies.clearAll();
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    // Pour toutes les autres erreurs, on les propage
    return Promise.reject(error);
  }
);

export default apiClient;

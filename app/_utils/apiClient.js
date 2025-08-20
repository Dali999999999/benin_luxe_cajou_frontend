import axios from 'axios';

// 1. Création de l'instance Axios
const apiClient = axios.create({
  baseURL: 'https://benin-luxe-cajou-api.onrender.com', // On retire /api de l'URL de base
  headers: { 'Content-Type': 'application/json' },
});

// 2. Intercepteur pour ajouter le token d'accès à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // On marque la requête pour éviter les boucles

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          // Si pas de refresh token, on ne peut rien faire, on déconnecte.
          console.error("Refresh token manquant, déconnexion.");
          localStorage.removeItem('access_token');
          window.location.href = '/sign-in';
          return Promise.reject(error);
        }

        // Appel à l'API pour obtenir un nouveau token d'accès
        const response = await axios.post(
          'https://benin-luxe-cajou-api.onrender.com/auth/refresh', // Endpoint de refresh
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { access_token } = response.data;

        // On met à jour le nouveau token dans le localStorage
        localStorage.setItem('access_token', access_token);

        // On met à jour le header de la requête originale et on la relance
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Si le refresh token est lui-même invalide, on déconnecte.
        console.error("Session expirée, déconnexion requise.");
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    // Pour toutes les autres erreurs, on les propage
    return Promise.reject(error);
  }
);

export default apiClient;

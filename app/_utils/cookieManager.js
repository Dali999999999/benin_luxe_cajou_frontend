// app/_utils/cookieManager.js
// Utilitaires pour la gestion sécurisée des cookies

/**
 * Définit un cookie avec les options de sécurité appropriées
 * @param {string} name - Nom du cookie
 * @param {string} value - Valeur du cookie
 * @param {Object} options - Options du cookie
 */
export const setCookie = (name, value, options = {}) => {
  const {
    expires = 7, // Expire dans 7 jours par défaut
    path = '/',
    secure = process.env.NODE_ENV === 'production', // Secure en production uniquement
    sameSite = 'lax' // Protection CSRF
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}; SameSite=${sameSite}`;
  
  // Ajouter la date d'expiration
  if (typeof expires === 'number') {
    const date = new Date();
    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }
  
  // Ajouter Secure en production (HTTPS)
  if (secure) {
    cookieString += '; Secure';
  }
  
  document.cookie = cookieString;
};

/**
 * Récupère la valeur d'un cookie
 * @param {string} name - Nom du cookie
 * @returns {string|null} - Valeur du cookie ou null si introuvable
 */
export const getCookie = (name) => {
  if (typeof document === 'undefined') return null; // SSR safety
  
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return null;
};

/**
 * Supprime un cookie
 * @param {string} name - Nom du cookie à supprimer
 * @param {string} path - Chemin du cookie (par défaut: '/')
 */
export const removeCookie = (name, path = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
};

/**
 * Vérifie si un cookie existe
 * @param {string} name - Nom du cookie
 * @returns {boolean} - true si le cookie existe
 */
export const hasCookie = (name) => {
  return getCookie(name) !== null;
};

/**
 * Supprime tous les cookies d'authentification
 */
export const clearAuthCookies = () => {
  removeCookie('access_token');
  removeCookie('refresh_token');
  removeCookie('session_id');
};

// Utilitaires spécifiques pour l'authentification
export const authCookies = {
  setTokens: (accessToken, refreshToken) => {
    setCookie('access_token', accessToken, { expires: 1 }); // 1 jour
    setCookie('refresh_token', refreshToken, { expires: 7 }); // 7 jours
  },
  
  getAccessToken: () => getCookie('access_token'),
  getRefreshToken: () => getCookie('refresh_token'),
  
  setSessionId: (sessionId) => {
    setCookie('session_id', sessionId, { expires: 30 }); // 30 jours
  },
  
  getSessionId: () => getCookie('session_id'),
  
  clearAll: () => clearAuthCookies()
};
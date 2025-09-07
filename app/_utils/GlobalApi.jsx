import { v4 as uuidv4 } from 'uuid';
import apiClient from './apiClient'; // On importe notre nouveau client API centralisé
import { authCookies } from './cookieManager'; // Gestion des cookies

// --- Gestion de la session pour les invités ---
const getSessionId = () => {
    let sessionId = authCookies.getSessionId();
    if (!sessionId) {
        sessionId = uuidv4();
        authCookies.setSessionId(sessionId);
    }
    return sessionId;
};


// =========== Section 1 : 🌐 Navigation & Consultation Publique ===========
// Ces routes utilisent maintenant apiClient et incluent /api

const getCategories = () => apiClient.get('/api/categories').then(resp => resp.data);

const getProducts = (params) => {
    let url = '/api/products';
    if (params?.typeId) {
        url = `/api/products?type_id=${params.typeId}`;
    } else if (params?.categoryId) {
        url = `/api/products?category_id=${params.categoryId}`;
    }
    return apiClient.get(url).then(resp => resp.data);
};

const getProductById = (id) => apiClient.get(`/api/products/${id}`).then(resp => resp.data);

const getCatalogueStructure = () => apiClient.get('/api/catalogue-structure').then(resp => resp.data);

const getDeliveryZones = () => apiClient.get('/api/delivery-zones').then(resp => resp.data);


// =========== Section 2 : 👤 Authentification Client ===========
// Ces routes n'ont PAS le préfixe /api

const register = (userData) => {
    userData.session_id = getSessionId();
    return apiClient.post('/auth/register', userData).then(resp => resp.data);
};

const login = (credentials) => {
    credentials.session_id = getSessionId();
    return apiClient.post('/auth/login', credentials).then(resp => resp.data);
};

const verifyAccount = (token, code) => {
    const payload = { token, code, session_id: getSessionId() };
    return apiClient.post('/auth/verify-account', payload).then(resp => resp.data);
};

const resendVerificationCode = (token) => {
    return apiClient.post('/auth/resend-verification', { token }).then(resp => resp.data);
};

const forgotPassword = (email) => {
    return apiClient.post('/auth/forgot-password', { email }).then(resp => resp.data);
};

const resetPassword = (email, code, new_password) => {
    const payload = { email, code, new_password };
    return apiClient.post('/auth/reset-password', payload).then(resp => resp.data);
};


// =========== Section 3 : 🛒 Gestion du Panier d'Achat ===========
// Route unique qui gère tout, avec un slash final très important

const manageCart = (data) => {
    const token = authCookies.getAccessToken();
    let body = { ...data };

    if (!token) {
        body.session_id = getSessionId();
    }
    
    return apiClient.post('/api/cart/', body).then(resp => resp.data);
};

const getCart = () => manageCart({});
const addToCart = (productId, quantity) => manageCart({ product_id: productId, quantity: quantity });
const removeFromCart = (productId) => manageCart({ product_id: productId, quantity: 0 });


// =========== Section 4 : 🧑‍💼 Profil de l'Utilisateur ===========
// Toutes ces routes nécessitent une authentification et incluent /api

const getProfile = () => apiClient.get('/api/profile/').then(resp => resp.data);
const updateProfile = (data) => apiClient.put('/api/profile/', data).then(resp => resp.data);
const updatePassword = (data) => apiClient.put('/api/profile/password', data).then(resp => resp.data);
const getOrders = () => apiClient.get('/api/profile/orders').then(resp => resp.data);
const getOrderById = (orderId) => apiClient.get(`/api/profile/orders/${orderId}`).then(resp => resp.data);

// Nouvelles routes pour les adresses
const getAddresses = () => apiClient.get('/api/profile/addresses').then(resp => resp.data);
const addAddress = (data) => apiClient.post('/api/profile/addresses', data).then(resp => resp.data);
const updateAddress = (id, data) => apiClient.put(`/api/profile/addresses/${id}`, data).then(resp => resp.data);
const deleteAddress = (id) => apiClient.delete(`/api/profile/addresses/${id}`).then(resp => resp.data);
const setDefaultAddress = (id) => apiClient.post(`/api/profile/addresses/${id}/set-default`).then(resp => resp.data);


// =========== Section 5 : 💳 Processus de Paiement ===========
// Nécessite une authentification et inclut /api

const placeOrder = (data) => apiClient.post('/api/checkout/place-order', data).then(resp => resp.data);
const initializePayment = (data) => apiClient.post('/api/payment/initialize', data).then(resp => resp.data);
const getPaymentStatus = (orderId) => apiClient.get(`/api/payment/status/${orderId}`).then(resp => resp.data);


// =========== Section 6 : 📢 Actions Publiques (Newsletter, Feedback) ===========

const subscribeToNewsletter = (email) => apiClient.post('/api/newsletter/subscribe', { email }).then(resp => resp.data);

const sendFeedback = (feedbackData) => apiClient.post('/api/feedback', feedbackData).then(resp => resp.data);


// On exporte toutes les fonctions pour qu'elles soient utilisables dans l'application.
export default {
    getCategories,
    getProducts,
    getProductById,
    register,
    login,
    getCart,
    addToCart,
    removeFromCart,
    getSessionId,
    verifyAccount,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile,
    updatePassword,
    getOrders,
    getOrderById,
    getDeliveryZones,
    placeOrder,
    initializePayment,
    getPaymentStatus,
    getCatalogueStructure,
    // Nouvelles fonctions pour les adresses
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    // Nouvelles fonctions publiques
    subscribeToNewsletter,
    sendFeedback,
};

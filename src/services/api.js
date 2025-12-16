import axios from "axios";
 
const API_BASE_URL = "http://127.0.0.1:8000/api";
const api = axios.create({
    baseURL: API_BASE_URL,
});
 
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
 
// Erro 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refresh = localStorage.getItem("refresh");
 
            if (refresh) {
                try {
                    const res = await axios.post(
                        "http://127.0.0.1:8000/api/token/refresh/",
                        { refresh }
                    );
 
                    localStorage.setItem("access", res.data.access);
                    error.config.headers.Authorization = `Bearer ${res.data.access}`;
 
                    return api(error.config);
                } catch (refreshError) {
                    console.error("Refresh falhou:", refreshError)
                }
            }
        }
        return Promise.reject(error);
    }
);
 
export default api;
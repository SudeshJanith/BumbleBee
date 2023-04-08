import axios from "axios";
import { Navigate } from "react-router-dom";

const AxiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`
})

AxiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config;
})

AxiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status == 401) {
        <Navigate to='/' />
        return error;
    }
    throw error;
})

export default AxiosClient
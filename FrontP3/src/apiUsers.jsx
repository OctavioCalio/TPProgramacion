import axios from 'axios';

const API_URL = 'tp-programacion-tawny.vercel.app'; // Cambia el puerto si es necesario

export const getUsers = async (params = {}) => {
    return await axios.get(API_URL, { headers: { params: JSON.stringify(params) } });
};

export const getUserById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createUser = async (userData) => {
    return await axios.post(API_URL, userData);
};

export const updateUser = async (id, userData) => {
    return await axios.put(`${API_URL}/${id}`, userData);
};

export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/tasks'; // Cambia el puerto si es necesario

export const getTasks = async (params) => {
    return await axios.get(API_URL, { headers: { params: JSON.stringify(params) } });
};

export const getTaskById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createTask = async (taskData) => {
    return await axios.post(API_URL, taskData);
};

export const updateTask = async (id, taskData) => {
    return await axios.put(`${API_URL}/${id}`, taskData);
};

export const deleteTask = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

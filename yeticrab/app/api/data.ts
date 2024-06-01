//data.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/dataTable';

// Create
export const create = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Read
export const getAll = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Update
export const update = async (data) => {
    try {
        const response = await axios.put(`${API_URL}/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete
export const remove = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
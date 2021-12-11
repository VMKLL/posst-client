import axios from 'axios';

export const nominatimApi = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org/search',
});

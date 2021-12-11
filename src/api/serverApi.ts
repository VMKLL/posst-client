import axios from 'axios';
import { Platform } from 'react-native';

export const serverApi = axios.create({
    baseURL:
        Platform.OS === 'ios'
            ? 'http://localhost:3001'
            : 'http://10.0.2.2:3001',
    //baseURL: Platform.OS ? 'https://evac-server.herokuapp.com' : null,
});

export const source = axios.CancelToken.source();

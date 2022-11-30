import axios from 'axios';
import {getTokenLocalStorage} from '../context/AuthProvider/util'

export const Api = axios.create({
    baseURL: "https://sef-api.techonsaude.com"
});

Api.interceptors.request.use(
    (config) =>{
        const token = getTokenLocalStorage();
        if(token) config.headers.Authorization = "Bearer " + token
        return config
    },
    (error) =>{
        return Promise.reject(error);
    }
)

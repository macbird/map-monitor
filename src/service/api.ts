import axios from 'axios';
import {getTokenLocalStorage} from '../context/AuthProvider/util'
import {useApp} from "../context/AppProvider/useApp"
export const Api = axios.create({
    baseURL: "http://localhost:3000"
});



Api.interceptors.request.use(
    (config) =>{
        const token = getTokenLocalStorage();

        if(token) config.headers.Authorization = "Bearer " + token
        return config
    },
    (error) =>{
        console.log(error.response)
        return Promise.reject(error);
    }
)

export const getInitialMarkers = async() => {
    const request = await Api.get('/api/markers/all')
    return request.data;
}

export const getAtividadeByAgente = async(id:string) => {
    const request = await Api.get(`/api/atividades/device/${id}`)
    return request.data;
}

export const GET = async(url:string, options?:any)=>{
    const {data} = await Api.get(url, {params:options})
    return data
}

export const POST = async(url:string, payload:any, options?:any)=>{
    const {data} = await Api.post(url, payload, {params:options})
    return data
}

export const PUT = async(url:string, payload:any, options?:any)=>{
    const {data} = await Api.put(url, payload, {params:options})
    return data
}

export const PATCH = async(url:string, payload:any, options?:any)=>{
    const {data} = await Api.put(url, payload, {params:options})
    return data
}

export const DELETE = async(url:string, options?:any)=>{
    const {data} = await Api.delete(url, {params:options})
    return data
}



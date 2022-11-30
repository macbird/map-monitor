import {Api} from "../../service/api";
import {IUser} from "./types";

export async function LoginRequest(login: string, password: string){
    try {
        console.log({login, password})
        const request = await Api.post('/login', {login, password})
        console.log(request)
        if(request) return request.data;
    }
    catch (error){
        console.log(error);
    }
}

export async function GetCurrentUser(){
    try{
        const request = await Api.get('api/usuarios/current')
        return request.data;
    }
    catch (error){

    }
}

export function setTokenLocalStorage(user: IUser | null){
    localStorage.setItem('token', JSON.stringify(user))
}

export function isAuthenticated(){
    const token_ = getTokenLocalStorage();
    if (token_) {
        return true;
    }
    return false;

}
export function getTokenLocalStorage(){
    const token = localStorage.getItem('token');
    return token

}

import React, {createContext, useState, useEffect} from 'react';
import { IContext, IAuthProvider, IUser} from './types'
import {Api} from "../../service/api"
import {LoginRequest, setTokenLocalStorage,getTokenLocalStorage, isAuthenticated} from './util'
export const AuthContext = createContext<IContext>({} as IContext)
export const AuthProvider = ({children}: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()
    const [authenticated, setAuthenticated] = useState(isAuthenticated())


    // useEffect(() => {
    //     const fetchUser = () => {
    //         // this would usually be your own backend, or localStorage
    //         // for example
    //         fetch("https://randomuser.me/api/")
    //             .then((response) => response.json())
    //             .then((result) => setUser(result.results[0]))
    //             .catch((error) => console.log("An error occured"));
    //     };
    //
    //     fetchUser();
    // }, []);

    async function authenticate(login: string, password: string){
        console.log("Fire authenticate")

        const response = await LoginRequest(login, password)
        setAuthenticated(true);
        setTokenLocalStorage(response);
    }


    function logout(){
        console.log("Fire logout")
        setUser(null);
        setAuthenticated(false);
        setTokenLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{user, authenticated, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


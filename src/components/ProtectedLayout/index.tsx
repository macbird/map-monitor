import React from 'react';
import {useAuth} from "../../context/AuthProvider/useAuth"

import {Navigate} from 'react-router-dom'

export const ProtectedLayout = ({children}: { children: JSX.Element }) => {
    const auth = useAuth();
    console.log("is authenticaded?", auth.authenticated)

    if (!auth.authenticated) {
        return <Navigate to="/login"/>
    }

    return children
}


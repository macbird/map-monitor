import React, {useState} from 'react';
import {AuthProvider} from './context/AuthProvider'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ProtectedLayout} from './components/ProtectedLayout'
import Home from './pages/Home'
import Login from './pages/Login'
function App(){
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <ProtectedLayout>
                            <Home/>
                        </ProtectedLayout>
                    }/>
                    <Route path='/login' element={ <Login/>}/>
                </Routes>
            </BrowserRouter>

        </AuthProvider>

    )
}

export default App;

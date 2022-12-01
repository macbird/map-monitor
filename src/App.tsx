import React, {useState} from 'react';
import {AuthProvider} from './context/AuthProvider'
import {AppProvider} from './context/AppProvider'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ProtectedLayout} from './components/ProtectedLayout'
import Modal from './components/modal/Modal'
import ConfirmAlert from './components/modal/ConfirmAlert'
import Home from './pages/Home'
import Login from './pages/Login'
function App(){
    return (
        <AuthProvider>
            <AppProvider>
                <>
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
                    <Modal />
                    <ConfirmAlert />
                </>
            </AppProvider>
        </AuthProvider>

    )
}

export default App;

import React from 'react';
import {AuthProvider} from './context/AuthProvider'
import {AppProvider} from './context/AppProvider'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ProtectedLayout} from './components/ProtectedLayout'
import Modal from './components/modal/Modal'
import Snackbar from './components/Snackbar'
import Loading from './components/modal/Loading'
import ConfirmAlert from './components/modal/ConfirmAlert'
import Home from './pages/Home'
import Login from './pages/Login'
import PanelFloat from './components/PanelFloat'

function App() {


    return (

        <AppProvider>
            <AuthProvider>
                <>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={
                                <ProtectedLayout>
                                    <Home/>
                                </ProtectedLayout>
                            }/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </BrowserRouter>
                    <Modal/>
                    <Loading/>
                    <ConfirmAlert/>
                    <PanelFloat/>
                    <Snackbar/>
                </>
            </AuthProvider>
        </AppProvider>


    )
}

export default App;

import React, {createContext, useState, useEffect} from 'react';
import { IContext, IAppProvider, IModal,IAlert} from './types'
import {Api} from "../../service/api"
export const AppContext = createContext<IContext>({} as IContext)
export const AppProvider = ({children}: IAppProvider) => {
    const [modal, setModal] = useState({visible: false})
    const [alert, setAlert] = useState({visible: false})

    function closeModal(){
        setModal({visible: false})
    }
    function openModal(modal:IModal){
        setModal({...modal, visible: true})
    }
    function openAlert(alert:IAlert){
        setAlert({...alert, visible: true})
    }
    function closeAlert(){
        setAlert({visible: false})
    }

    return (
        <AppContext.Provider value={{modal, alert, closeModal, openModal, closeAlert, openAlert}}>
            {children}
        </AppContext.Provider>
    )
}


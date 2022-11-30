import React, {createContext, useState, useEffect} from 'react';
import { IContext, IAppProvider} from './types'
import {Api} from "../../service/api"
export const AppContext = createContext<IContext>({} as IContext)
export const AppProvider = ({children}: IAppProvider) => {
    const [modal, setModal] = useState({visible: false})

    return (
        <AppContext.Provider value={{modal}}>
            {children}
        </AppContext.Provider>
    )
}


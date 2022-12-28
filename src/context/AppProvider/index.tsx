import React, {createContext, useCallback, useState} from 'react';
import {IAlert, IAppProvider, IContext, IModal, IPanelFloat, ISnack} from './types'
import debounce from 'lodash/debounce';

export const AppContext = createContext<IContext>({} as IContext)
export const AppProvider = ({children}: IAppProvider) => {
    const [modal, setModal] = useState({visible: false})
    const [loading, setLoading] = useState({visible: false})
    const [alert, setAlert] = useState({visible: false})
    const [panel, setPanel] = useState({visible: false})
    const [snackbar, setSnackbar] = useState({visible: false})
    const [search, setSearch] = useState<string | null>()
    const [searchable, setSearchable] = useState<boolean>(true)

    const changeHandler = ({target: {value}}: { target: any }): void => {
        // if(value.length>=3) 
        setSearch(value)
        // else
        // setSearch("")
    };


    const searchHandler = useCallback(debounce(changeHandler, 300), [])


    function closeModal() {
        setSearch("")

        setModal({visible: false})
    }

    function openModal(modal: IModal) {
        setModal({...modal, visible: true})
    }

    function closeLoading() {
        setLoading({visible: false})
    }

    function openLoading() {
        setLoading({visible: true})
    }

    function openAlert(alert: IAlert) {
        setAlert({...alert, visible: true})
    }

    function closeAlert() {
        setAlert({visible: false})
    }

    function openPanelFloat(alert: IPanelFloat) {
        setPanel({...alert, visible: true})
    }

    function closePanelFloat() {
        setPanel({visible: false})
    }

    const openSnackbar = (snack: ISnack) => {
        setSnackbar({...snack, visible: true});
    };

    const closeSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar({visible: false});
    };

    const toogleSearch = () => {
        setSearchable(visible => !visible)
    }
    const clearSearch = () => {
        console.log("Clear search is fired", search)
        setSearch("")
    }


    return (
        <AppContext.Provider value={{
            modal,
            loading,
            alert,
            panel,
            snackbar,
            search,
            searchable,
            closeModal,
            openModal,
            closeLoading,
            openLoading,
            closeAlert,
            openAlert,
            closePanelFloat,
            openPanelFloat,
            closeSnackbar,
            openSnackbar,
            searchHandler,
            toogleSearch,
            clearSearch
        }}>
            {children}
        </AppContext.Provider>
    )
}


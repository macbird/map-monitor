import {useContext} from 'react';
import {AppContext} from "."

export const useApp = () => {
    const context = useContext(AppContext);
    return context;
}

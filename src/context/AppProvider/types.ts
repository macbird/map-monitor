export interface IModal {
    visible: boolean;
    component?: JSX.Element,
    title?: string;
    disableClosed?: boolean;
    height?: string;
    width?: string
}
export interface ILoading {
    visible: boolean;
    gif?: JSX.Element,
}
export interface IPanelFloat {
    visible: boolean;
    component?: JSX.Element,
    title?: string,
    onClose?: () => void

}
export interface IAlertOptions {
    cancelButtonLabel?: string
    confirmButtonLabel?: string
    confirmButtonColor?: string
    icon?: string
}
export interface IAlert {
    visible: boolean;
    options?: IAlertOptions
    title?: string;
    description?: string;
    onConfirm?: () => void;
}
export interface ISnack {
    visible?: boolean;
    color?: string
    message: string;
    severity: string,
    autoHideDuration?:number
}

export interface ISearch{
    visible?:boolean,
    value?: string
}
export interface IContext {
    modal: IModal;
    loading: ILoading,
    alert: IAlert;
    panel: IPanelFloat,
    snackbar:any,
    search:any,
    searchable:boolean,
    closeModal: () => void
    openModal: (modal:IModal) => void
    closeLoading: () => void
    openLoading: () => void
    closeAlert: () => void
    openAlert: (alert: IAlert) => void
    closePanelFloat:()=> void
    openPanelFloat:(panelFloat: IPanelFloat) => void
    closeSnackbar:(event: React.SyntheticEvent | Event, reason?: string)=> void
    openSnackbar:(snack: ISnack) => void
    searchHandler:(event: React.SyntheticEvent | Event, reason?: string)=> void
    toogleSearch:()=>void;
    clearSearch:()=>void;

}

export interface IAppProvider {
    children : JSX.Element;
}

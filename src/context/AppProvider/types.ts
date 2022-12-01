export interface IModal {
    visible: boolean;
    component?: JSX.Element,
    title?: string;
    disableClosed?: boolean;
}
export interface IPanelFloat {
    visible: boolean;
    component?: JSX.Element,
    title?: string;
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
export interface IContext {
    modal: IModal;
    alert: IAlert;
    panelFloat: IPanelFloat
    closeModal: () => void
    openModal: (modal:IModal) => void
    closeAlert: () => void
    openAlert: (alert: IAlert) => void
    closePanelFloat:()=> void
    openPanelFloat:(panelFloat: IPanelFloat) => void

}

export interface IAppProvider {
    children : JSX.Element;
}

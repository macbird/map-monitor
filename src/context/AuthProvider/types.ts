export interface IUser {
    login?: string;
    token?: string;
}

export interface IContext {
    user: any;
    authenticated: boolean;
    authenticate: (login: string, password: string) => Promise<void>
    logout: () => void
}

export interface IAuthProvider {
    children: JSX.Element;
}

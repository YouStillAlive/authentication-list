import { createContext } from "react";

export const UserContext = createContext(null);

export default class User {
    constructor() {
        this._isAuth = false;
        this._user = {};
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }
    
    get user() {
        return this._user;
    }
}
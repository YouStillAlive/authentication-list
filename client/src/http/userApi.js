import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password) => {
    await $host.post('api/user/registration', { name, email, password });
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async () => {
    try {
        if (localStorage.getItem("token") !== null) {
            const { data } = await $authHost.get('api/user/auth');
            localStorage.setItem('token', data.token);
            return jwt_decode(data.token);
        }
    } catch (e) {
        console.log(e);
    }
}

export const getUsers = async () => {
    const { data } = await $authHost.get('api/user/users');
    return data;
}

export const deleteUsers = async (id) => {
    try {
        await $authHost.post('api/user/delete', { id });
    } catch (e) {
        console.log(e);
    }
}

export const blockUsers = async (id, block) => {
    try {
        await $authHost.post('api/user/block', { id, block });
    } catch (e) {
        console.log(e);
    }
}
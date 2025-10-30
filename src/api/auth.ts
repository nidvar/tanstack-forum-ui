import axiosAPI from "@/lib/axios";

import type { User } from '../types';

export const registerUser = async function(user: User){
    const res = await axiosAPI.post('register', user);
    return res.data;
};

export const login = async function(user: {email: string, password: string}){
    const res = await axiosAPI.post('login', user);
    return res.data;
}

export const logout = async function(): Promise<any>{
    const res = await axiosAPI.post('logout');
    return res.data;
}

export const authMe = async function(): Promise<any>{
    const res = await axiosAPI.post('authme');
    return res.data;
}
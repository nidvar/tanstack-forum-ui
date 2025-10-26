import axiosAPI from "@/lib/axios";

import type { User } from '../types'

export const registerUser = async function(user: User){
    console.log(user);
    const res = await axiosAPI.post('register', user);
    console.log(res.data);
    return res.data;
};

export const login = async function(user: {email: string, password: string}){
    console.log(user);
    const res = await axiosAPI.post('login', user);
    return res.data;
}
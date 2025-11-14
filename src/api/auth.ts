import axiosAPI from "@/lib/axios";

import type { User } from '../types';
import { AxiosError } from 'axios';

const tryCatch = async function(arg: string, user?: {email: string, password: string}){
    try{
        const res = await axiosAPI.post(arg, user);
        return res.data;
    }catch(error){
        const err = error as AxiosError;
        if(err.response){
            return err.response.data;
        }
    }
}

export const registerUser = async function(user: User){
    const result = await tryCatch('register', user);
    return result;
};

export const login = async function(user: User){
    const result = await tryCatch('login', user);
    return result;
};

export const logout = async function(){
    const result = await tryCatch('logout');
    return result;
};

export const authMe = async function(){
    const result = await tryCatch('authme');
    return result;
};
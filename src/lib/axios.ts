import axios from 'axios';
import type { Post } from '../types'

export const axiosAPI = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const singlePost = async function(postId: string): Promise<Post>{
    const res = await axiosAPI.get(`posts/${postId}`);
    return res.data;
}

export const allPosts = async function(): Promise<Post[]>{
    const res = await axiosAPI.get<Post[]>(`posts`);
    res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.data;
}
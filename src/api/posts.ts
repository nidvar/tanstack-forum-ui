import type { Post, NewPost } from '../types';
import axiosAPI from "@/lib/axios";

export const singlePost = async function(postId: string): Promise<Post>{
    const res = await axiosAPI.get(`posts/${postId}`);
    return res.data;
}

export const allPosts = async function(): Promise<Post[]>{
    const res = await axiosAPI.get<Post[]>(`posts`);
    res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.data;
}

export const createNewPost = async function(newPost: NewPost): Promise<Post>{
    const res = await axiosAPI.post('posts', {
            ...newPost,
            createdAt: new Date().toISOString()
        } 
    );
    return res.data;
}

export const deletePost = async function(postId: string): Promise<void>{
    const res = await axiosAPI.delete(`posts/${postId}`);
    return res.data;
}

export const editPost = async function(newPost: NewPost, id: string): Promise<Post>{
    const res = await axiosAPI.put(`posts/${id}`, {
            ...newPost,
            createdAt: new Date().toISOString()
        } 
    );
    return res.data;
}

export const addComment = async function(comment: string, username: string, id: string): Promise<void>{
    const res = await axiosAPI.post(`posts/${id}/comment`, {
        comment,
        username,
        postId: id
    });
    return res.data;
}

export const likeOrDislikeAPI = async function(likeOrDislike: string, id:string, email: string): Promise<void>{
    const res = await axiosAPI.post(`posts/${id}/likeOrDisLike/${likeOrDislike}`, {
        id,
        likeOrDislike,
        email
    });

    return res.data;
}
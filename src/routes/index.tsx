import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {allPosts} from '../api/posts';

import type {Post} from '../types';

import PostCard from '@/components/PostCard';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    const [posts, setPosts] = useState<Post[]>([]);

    const loadPosts = async function(){
        const posts = await allPosts();
        setPosts(posts);
    }

    useEffect(()=>{
        loadPosts();
    }, [])

    return (
        <div className='main'>
            <h1>Forum</h1>
            <p className='center margin-bottom-lg'>React | TypeScript | Node | MongoDB | JWT</p>
            <div className='posts-list-column'>
                {posts.map((item)=>{
                    return(
                        <PostCard post={item} key={item._id} link={'./posts/' + item._id}/>
                    )
                })}
            </div>
        </div>
    )
}

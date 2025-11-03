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
            <div className='search-container'>
                <input 
                    className='search-input'
                    placeholder='search'
                />
                <select className='filter-select'>
                    <option value='all'>Latest</option>
                    <option value='react'>Oldest</option>
                    <option value='react'>Most Commented</option>
                    <option value='react'>Most Liked</option>
                </select>
            </div>
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

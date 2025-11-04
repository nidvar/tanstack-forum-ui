import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
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
            <p className='center'>React | TypeScript | Node | MongoDB | JWT</p>
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
                {
                    posts.length === 0? (
                        <div className='center margin-top'>
                            <p>Loading data....</p>
                            <p>Free tier server sleeps from inactivity.</p>
                            <p>May take a few minutes.</p>
                        </div>
                    ):''
                }
                {posts.map((item)=>{
                    return(
                        <React.Fragment key={item._id}>
                            <PostCard post={item} key={item._id} link={'./posts/' + item._id}/>
                            <div className='horizontal-line'></div>
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

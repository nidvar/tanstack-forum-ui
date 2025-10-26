import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {allPosts} from '../api/posts';

import type {Post} from '../types';

import PostCard from '@/components/PostCard';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
    
    const loadPosts = async function(){
        const posts = await allPosts();
        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const firstThree = posts.slice(0, 3);
        setDisplayPosts(firstThree);
    }

    useEffect(()=>{
        loadPosts();
    }, []);

    return (
        <div className='main'>
            <h1>Forum</h1>
            <p className='center'>React | TypeScript | Node | MongoDB | JWT</p>
            <div className='posts-list'>
                {displayPosts.map((item)=>{
                    return(
                        <PostCard post={item} key={item._id} link={'./posts/' + item._id} />
                    )
                })}
                <Link to='/posts' className='center button'>View All Posts</Link>
            </div>
        </div>
    )
}

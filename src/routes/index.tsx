import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import axiosAPI from '../lib/axios';

import type {Post} from '../types';

import PostCard from '@/components/PostCard';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
    
    const grabPosts = async function(){
        const res = await axiosAPI.get<Post[]>(`posts`);
        res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const firstThree = res.data.slice(0, 3);
        setDisplayPosts(firstThree);
    }

    useEffect(()=>{
        grabPosts();
    }, []);

    return (
        <div className='main'>
            <h1>Forum</h1>
            <p className='center'>Latest posts</p>
            <div className='posts-list'>
                {displayPosts.map((item)=>{
                    return(
                        <PostCard post={item} key={item.id} link={'./posts/' + item.id} />
                    )
                })}
                <Link to='/posts' className='center link-button'>View All Posts</Link>
            </div>
            
        </div>
    )
}

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

import axiosAPI from '../../lib/axios';

import type {Post} from '../../types';

import PostCard from '@/components/PostCard';

export const Route = createFileRoute('/posts/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [posts, setPosts] = useState<Post[]>([]);

    const grabData = async function(){
        const res = await axiosAPI.get('/posts');
        setPosts(res.data);
    }

    useEffect(()=>{
        grabData();
    }, [])

    return (
        <>
            <div className='main'>
                <h1>Posts</h1>
                <div className='posts-list-column'>
                    {posts.map((item)=>{
                        return(
                            <PostCard post={item} key={item.id} link={'./' + item.id}/>
                        )
                    })}
                </div>
                <div className='my-flex'>
                    <Link to='/' className='link-button'>HOME</Link>
                </div>
            </div>
        </>
    )
}

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

import {allPosts} from '../../api/posts';

import type {Post} from '../../types';

import PostCard from '@/components/PostCard';

export const Route = createFileRoute('/posts/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [posts, setPosts] = useState<Post[]>([]);

    const loadPosts = async function(){
        const posts = await allPosts();
        setPosts(posts);
    }

    useEffect(()=>{
        loadPosts();
    }, [])

    return (
        <>
            <div className='main'>
                <h1>Posts</h1>
                <Link to='/' className='blue underline center'>{'<-'} Back home</Link>
                <div className='posts-list-column'>
                    {posts.map((item)=>{
                        return(
                            <PostCard post={item} key={item._id} link={'./' + item._id}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

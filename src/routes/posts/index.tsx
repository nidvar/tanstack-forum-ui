import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

import axiosAPI from '../../lib/axios';

import type {Post} from '../../types';

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
                <div className='posts-list'>
                    {posts.map((item)=>{
                        return(
                            <div className='post' key={item.id}>
                                <Link to={'./' + item.id}>
                                    <h3>{item.title}</h3>
                                    <p>{item.summary}</p>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <Link to='/'>HOME</Link>
            </div>
        </>
    )
}

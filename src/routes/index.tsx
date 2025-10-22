import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import axiosAPI from '../lib/axios';

import type {Post} from '../types';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
    const grabPosts = async function(){
        const res = await axiosAPI.get<Post[]>(`posts`);
        res.data.sort((a, b) =>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const firstThree = res.data.slice(0, 3);
        setDisplayPosts(firstThree);
    }
    useEffect(()=>{
        grabPosts();
    }, []);
    return (
        <div className='main'>
            <h1>Forum</h1>
            <div className='posts-list'>
                {displayPosts.map((item)=>{
                    return(
                        <div className='post' key={item.id}>
                            <Link to={'./posts/' + item.id}>
                                <h3>{item.title}</h3>
                                <p>{item.summary}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

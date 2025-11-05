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
    const [searchedPosts, setSearchedPosts] = useState<Post[]>([]);

    const handleSearch = function(e: React.ChangeEvent<HTMLInputElement>){
        const arr = posts.filter((item)=>{
            if(item.title.includes(e.target.value)){
                return true;
            }else{
                return false;
            }
        });
        setSearchedPosts(arr);
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Clone the array first
        const arr = [...searchedPosts];

        if (e.target.value === 'oldest') {
            arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else {
            arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        setSearchedPosts(arr);
    };

    const loadPosts = async function(){
        const posts = await allPosts();
        setPosts(posts);
        setSearchedPosts(posts);
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
                    onChange={function(e){handleSearch(e)}}
                />
                <select 
                    className='filter-select'
                    onChange={function(e){handleSort(e)}}
                >
                    <option value='latest'>Latest</option>
                    <option value='oldest'>Oldest</option>
                    {/* <option value='commented'>Most Commented</option>
                    <option value='liked'>Most Liked</option> */}
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
                {
                    searchedPosts.map((item)=>{
                        return(
                            <React.Fragment key={item._id}>
                                <PostCard post={item} key={item._id} link={'./posts/' + item._id}/>
                                <div className='horizontal-line'></div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

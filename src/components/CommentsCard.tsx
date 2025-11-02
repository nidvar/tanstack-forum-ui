import { grabProfile } from '../api/profile';

import {useState, useEffect} from 'react';

import { timeAgo } from '../tools/tools';

type Comment = {
    postId: string
    comment: string
    username: string
    createdAt?: string
    id?: string
    updatedAt?: string
}

type Profile = {
    username: string
    createdAt: string
    profilePic: string
    lastLogIn: string
}

const CommentsCard = function({comment, username}: {comment: Comment, username: string}){
    
    const [profile, setProfile] = useState<Profile | null>(null)
    
    const getProfile = async function(){
        const profile = await grabProfile(username);
        setProfile(profile);
    };

    useEffect(()=>{
        getProfile();
    }, [])

    return(
        <>

            <div className='single-comment'>
                <img src={profile?.profilePic || '/blank_profile.jpg'}  className='single-comment-profile'/>
                <div>
                    <p><span className='bold'>{username}</span> - <span className='post-time'>{timeAgo(comment.createdAt || '')}</span></p>
                    <p>{comment.comment}</p>
                </div>
            </div>
            
        </>
    )
}

export default CommentsCard
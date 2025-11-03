import { grabProfile } from '../api/profile';
import { useAuth } from '../store/authContext';

import {useState, useEffect} from 'react';

import { timeAgo } from '../tools/tools';
import { FaTrash } from "react-icons/fa6";

type Comment = {
    postId: string
    comment: string
    username: string
    createdAt?: string
    _id?: string
    updatedAt?: string
}

type Profile = {
    username: string
    createdAt: string
    profilePic: string
    lastLogIn: string
}

const CommentsCard = function({comment, username, deleteComment}: {comment: Comment, username: string, deleteComment: Function}){

    const authState = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [deleteAble, setDeleteAble] = useState(false);
    const getProfile = async function(){
        const profile = await grabProfile(username);
        setProfile(profile);
    };
    
    useEffect(()=>{
        const asyncHandler = async function(){
            await getProfile();
        };
        asyncHandler();
    }, []);

    useEffect(()=>{
        if(profile?.username === authState.userData.username){
            setDeleteAble(true);
        }
    }, [profile])

    return(
        <>
            <div className='single-comment'>
                <div className='flex'>
                    <img src={profile?.profilePic || '/blank_profile.jpg'}  className='single-comment-profile'/>
                    <div>
                        <p><span className='bold'>{username}</span> - <span className='post-time'>{timeAgo(comment.createdAt || '')}</span></p>
                        <p>{comment.comment}</p>
                    </div>
                </div>
                {
                    deleteAble?  (
                        <>
                            <button onClick={function(){deleteComment(comment._id || '', comment.postId)}}>
                                <FaTrash size={12} />
                            </button>
                        </>
                    ):''
                }
            </div>
        </>
    )
}

export default CommentsCard
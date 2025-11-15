import { useAuth } from '../store/authContext';

import {useState, useEffect} from 'react';
import { Link } from '@tanstack/react-router'

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

const CommentsCard = function({profilePic, comment, username, deleteComment}: {profilePic:string, comment: Comment, username: string, deleteComment: Function}){

    const authState = useAuth();

    const [deleteAble, setDeleteAble] = useState(false);

    useEffect(()=>{
        if(username === authState.userData.username){
            setDeleteAble(true);
        }
    }, [])

    return(
        <>
            <div className='single-comment'>
                <div className='flex'>
                    <Link to={'/profile/' + username}>
                        <img src={profilePic || '/blank_profile.jpg'}  className='single-comment-profile'/>
                    </Link>
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
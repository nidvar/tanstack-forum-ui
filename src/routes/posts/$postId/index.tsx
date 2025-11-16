import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useQueryClient } from '@tanstack/react-query';

import { FaTrash, FaPenToSquare } from "react-icons/fa6";
import { useState, useRef, useEffect } from 'react';

import {singlePost, deletePost, addComment, deleteComment} from '../../../api/posts';

import { useAuth } from '../../../store/authContext';

import PostStats from '../../../components/PostStats';
import { timeAgo } from '../../../tools/tools';

import CommentsCard from '../../../components/CommentsCard';

const postQueryOptions = function(postId: string){
    return queryOptions({
        queryKey: ['post', postId],
        queryFn: function(){return singlePost(postId)}
    })
}

export const Route = createFileRoute('/posts/$postId/')({
    head: () => ({
        meta: [{ title: 'Jarro - New Post' },]
    }),
    component: PostDetailsPage,
    loader: async function({params, context: { queryClient }}){
        return queryClient.ensureQueryData(postQueryOptions(params.postId))
    }
})

function PostDetailsPage() {
    const queryClient = useQueryClient();
    const authState = useAuth();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const navigate = useNavigate();

    const [disable, setDisable] = useState(false);
    const [toggleComment, setToggleComment] = useState(false);
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [, setLikeOrDislike] = useState('');

    const { postId } = Route.useParams();
    const {data:post} = useSuspenseQuery(postQueryOptions(postId));

    const [commentsList, setCommentsList] = useState(post.comments || [])

    const postDelete = async function(id: string){
        setDisable(true);
        try{
            await deletePost(id);
            navigate({ to: '/' });
        }catch(error){
            console.log(error);
        }finally{
            setDisable(false);
        }
    };

    const editPost = function(id: string){
        navigate({ to: `/posts/$postId/edit`, params:{ postId: id } });
    };

    const clearError = function(){
        setErrorMessage('');
    };

    const grabLikeDislike = function(arg: string){
        setLikeOrDislike(arg);
    };

    const refreshComments = async function(){
        const refreshedPost = await singlePost(postId);
        setCommentsList(refreshedPost.comments);
    }

    const submitComment = async function(){
        setToggleComment(false);
        clearError();
        if(authState.userData.email == ''){
            setErrorMessage('Please login to comment')
            return
        };

        if(comment.trim() === ''){
            setErrorMessage('Field cannot be blank')
            return
        };

        await addComment(comment, authState.userData.username, postId, authState.userData.profilePic);
        const arr= [...post.comments];
        const commentObj = {
            postId,
            comment,
            username: authState.userData.username,
            profilePic: authState.userData.profilePic
        }
        arr.push(commentObj);
        setComment('')
        setCommentsList(arr);
        refreshComments();
    };

    const deleteCommentHandler = async function(commentId: string, postId: string){
        await deleteComment(commentId || '', postId);

        queryClient.setQueryData(['post', postId], (old: any) => {
            if (!old || !old.comments) return old; // guard against undefined
            return {
                ...old,
                comments: old.comments.filter((c: any) => c._id !== commentId)
            }
        });
        
        const arr = commentsList;

        const arr2 = arr.filter((item)=>{
            if(item._id == commentId){
                return false
            }else{
                return true
            }
        });

        setCommentsList(arr2);
        refreshComments();
    }

    useEffect(() => {
        if (toggleComment) {
            textareaRef.current?.focus();
        }
    }, [toggleComment]);

    useEffect(()=>{
        refreshComments();
    }, []);

    return (
        <>
            <div className='post-header'>
                <div className='profile-icon back'>
                    <Link to='/'>
                        <img src='/back.png' />
                    </Link>
                </div>
                <div className='profile-icon'>
                    <Link to={
                        post.junk?.source? 
                        post.junk?.source:
                        '/profile/' + post.author.username
                    } target='_blank'>
                        <img src={post.author.profilePic || '/blank_profile.jpg'} />
                    </Link>
                </div>
                <div>
                    <p>
                        <Link to={
                            post.junk?.source? 
                            post.junk?.source:
                            '/profile/' + post.author.username
                        } target='_blank'>
                            {post.author.username}
                            <span className='post-time'> - {timeAgo(post.createdAt)}</span>
                        </Link>
                    </p>
                    {
                        post.tags.length > 0?
                        <span className='post-tags'>{post.tags.map((item: any)=> item)}</span>:
                        ''
                    }
                </div>
            </div>
            <div className='main-post post-details'>
                <div className='post-content'>
                    <h2>{post.title}</h2>
                    <p>By {post.junk?.creator}</p>
                        {
                            post.img?.url?
                            <div className='post-image-upload-container'>
                                <img src={post.img?.url} />
                            </div>:
                            ''
                        }
                    <p>{post.content} {post.junk?.link? <Link to={post.junk?.link} target='_blank' className='link-color'>....Read more...</Link>: ''}</p>
                </div>

                <div className='post-stats-and-icon'>
                    <PostStats 
                        likeDislike={grabLikeDislike} 
                        likes={post.likes.length} 
                        dislikes={post.dislikes.length} 
                        noOfComments={commentsList.length}
                        id={postId} 
                        email={authState.userData.email}
                    />
                    {
                        authState.loggedIn && post.author.username === authState.userData.username?(
                            <div className='my-flex-end delete-edit-post'>
                                <button onClick={function(){editPost(post._id)}}>
                                    <FaPenToSquare size={18} />
                                </button>
                                <button onClick={function(){postDelete(post._id)}} disabled={disable}>
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        ):''
                    }
                </div>

            </div>

            <div className='comments-section'>
                {
                    toggleComment?
                        <>
                            <textarea
                                ref={textareaRef}
                                className='comment'
                                placeholder='Add a comment'
                                id='comment'
                                value={comment}
                                onChange={function(e){setComment(e.target.value); clearError();}}
                            ></textarea>
                            <div className='my-flex-end'>
                                <button 
                                    onClick={function(){setToggleComment(false); clearError();}} 
                                    className='margin-top comment-buttons'
                                >
                                    CANCEL
                                </button>
                                <button 
                                    onClick={function(){submitComment();}} 
                                    className='margin-top ml-l comment-buttons'
                                >
                                    ADD
                                </button>
                            </div>
                        </>:<input
                                className='comment-toggle'
                                placeholder='Add a comment'
                                id='comment'
                                onClick={function(){setToggleComment(true); clearError();}}
                            />
                }
                <p className='error margin-top'>{errorMessage}</p>
            </div>
            <div className='display-comments'>
                {commentsList.map((item)=>{
                    return (
                        <CommentsCard profilePic={item.profilePic} username={item.username} comment={item} key={item.postId + Math.random()} deleteComment={deleteCommentHandler}/>
                    )
                })}
            </div>
        </>
    )
}

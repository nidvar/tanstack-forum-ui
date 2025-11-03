import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { FaTrash, FaPenToSquare } from "react-icons/fa6";
import { useState, useRef, useEffect } from 'react';

import {singlePost, deletePost, addComment, deleteComment} from '../../../api/posts';

import {grabProfile} from '../../../api/profile';

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

    const authState = useAuth();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const navigate = useNavigate();

    const [disable, setDisable] = useState(false);
    const [toggleComment, setToggleComment] = useState(false);
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [postAuthor, setPostAuthor] = useState('');

    const [, setLikeOrDislike] = useState('');

    const { postId } = Route.useParams();
    const {data:post} = useSuspenseQuery(postQueryOptions(postId));

    const [commentsList, setCommentsList] = useState(post.comments || [])

    const authorProfile = async function(){
        const author = await grabProfile(post.username);
        setPostAuthor(author.profilePic);
    }

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
        await addComment(comment, authState.userData.username, postId);
        const arr= [...post.comments];
        const commentObj = {
            postId,
            comment,
            username: authState.userData.username,
        }
        arr.push(commentObj);
        setComment('')
        setCommentsList(arr);
        refreshComments();
    };

    const deleteCommentHandler = async function(commentId: string, postId: string){
        await deleteComment(commentId || '', postId);
        
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
        authorProfile();
    }, []);


    return (
        <>
            <div className='main post-details'>
                <Link to='/' className='blue underline'>{'<-'} Back to posts</Link>
                <div className='post-header'>
                    <div className='profile-icon'>
                        <Link to={'/profile/' + post.username}>
                            <img src={postAuthor || 'blank_profile.jpg'} />
                        </Link>
                    </div>
                    <div>
                        <p>
                            <Link to={'/profile/' + post.username}>
                                {post.username}
                                <span className='post-time'> - {timeAgo(post.createdAt)}</span>
                            </Link>
                        </p>
                        <span className='post-tags'>{post.tags.map((item: any)=> item)}</span>
                    </div>
                </div>

                <div className='post-content'>
                    <h2>{post.title}</h2>
                    <img src={post.img?.url} />
                    <p>{post.content}</p>
                </div>

                <PostStats likeDislike={grabLikeDislike} likes={post.likes.length} dislikes={post.dislikes.length} id={postId} email={authState.userData.email}/>

                {
                    authState.loggedIn && post.username === authState.userData.username?(
                        <div className='my-flex-end'>
                            <button className='margin-top' onClick={function(){editPost(post._id)}}>
                                <FaPenToSquare size={18} />
                            </button>
                            <button className='margin-top ml-l' onClick={function(){postDelete(post._id)}} disabled={disable}>
                                <FaTrash size={18} />
                            </button>
                        </div>
                    ):''
                }

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
                <p>{errorMessage}</p>
            </div>
            <div className='display-comments'>
                {commentsList.map((item)=>{
                    return (
                        <CommentsCard username={item.username} comment={item} key={item.postId + Math.random()} deleteComment={deleteCommentHandler}/>
                    )
                })}
            </div>
        </>
    )
}

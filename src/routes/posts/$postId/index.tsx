import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { FaTrash, FaPenToSquare, FaComment } from "react-icons/fa6";
import { useState, useRef, useEffect } from 'react';

import {singlePost, deletePost} from '../../../api/posts';
import { useAuth } from '../../../store/authContext';

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

    const [hoverLike, setHoverLike] = useState(false);

    const [likeChoice, setLikeChoice] = useState(false);





    const { postId } = Route.useParams();
    const {data: post} = useSuspenseQuery(postQueryOptions(postId));

    const postDelete = async function(id: string){
        setDisable(true);
        try{
            deletePost(id);
            await navigate({ to: '/' });
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

    const chooseLike = function(){
        const votedState = likeChoice;
        setLikeChoice(!votedState);
    };

    useEffect(() => {
        if (toggleComment) {
            textareaRef.current?.focus();
        }
    }, [toggleComment]);

    return (
        <>
            <div className='main post-details'>
                <Link to='/' className='blue underline'>{'<-'} Back to posts</Link>
                <div className='post-header'>
                    <div className='profile-icon'>
                        <p>PP</p>
                    </div>
                    <div>
                        <p>
                            <span className='post-tags'>{post.tags.map((item)=> item)}</span>
                            <span className='post-time'> - {post.createdAt}</span>
                        </p>
                        <p className='post-username'>{post.username}</p>
                    </div>
                </div>

                <h2>{post.title}</h2>
                <p>{post.content}</p>

                <div className='post-stats'>

                    {
                        likeChoice === false? (
                            <div 
                                onMouseEnter={function(){setHoverLike(true)}}
                                onMouseLeave={function(){setHoverLike(false)}}
                            >
                                {
                                    hoverLike === true? 
                                    <img onClick={function(){chooseLike()}} className='icon' src="/liked.ico"/>: 
                                    <img onClick={function(){chooseLike()}} className='icon' src="/like.ico"/>
                                }
                            </div>
                        ): 
                        <img onClick={function(){chooseLike()}} className='icon' src="/liked.ico"/>
                    }

                    <div>
                        <img className='icon' src="/comments.ico"/> {post.comments} 
                    </div>
                    <div>
                        <img className='icon' src="/comments.ico"/> {post.comments} 
                    </div>
                </div>

                {
                    authState.loggedIn?(
                        <div className='my-flex-end'>
                            <button className='margin-top' onClick={function(){editPost(post._id)}}>
                                <FaPenToSquare size={24} />
                            </button>
                            <button className='margin-top ml-l' onClick={function(){postDelete(post._id)}} disabled={disable}>
                                <FaTrash size={24} />
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
                                    className='margin-top'
                                >
                                    CANCEL
                                </button>
                                <button className='margin-top ml-l'>ADD</button>
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
        </>
    )
}

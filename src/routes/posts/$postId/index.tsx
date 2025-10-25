import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { FaTrash, FaPenToSquare } from "react-icons/fa6";

import { useState } from 'react'

import {singlePost, deletePost} from '../../../api/posts';

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
    const navigate = useNavigate();

    const [disable, setDisable] = useState(false);

    const { postId } = Route.useParams();
    const {data: post} = useSuspenseQuery(postQueryOptions(postId));

    const postDelete = async function(id: string){
        setDisable(true);
        try{
            deletePost(id);
            await navigate({ to: '/posts' });
        }catch(error){
            console.log(error);
        }finally{
            setDisable(false);
        }
    };

    const editPost = function(id: string){
        navigate({ to: `/posts/$postId/edit`, params:{ postId: id } });
    }

    return (
        <>
            <div className='main post-details'>
                <Link to='/posts' className='blue underline'>{'<-'} Back to posts</Link>
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
                
                <div className='post-title-header'>
                    <h2>{post.title}</h2>
                    
                </div>
                <p className='post-content'>{post.content}</p>
                <div className='my-flex-end'>
                    <button className='margin-top' onClick={function(){editPost(post._id)}}>
                        <FaPenToSquare size={24} />
                    </button>
                    <button className='margin-top ml-l' onClick={function(){postDelete(post._id)}} disabled={disable}>
                        <FaTrash size={24} />
                    </button>
                </div>
            </div>
        </>
    )
}

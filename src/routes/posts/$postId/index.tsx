import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

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
                <h1>{post.title}</h1>
                <h3>{post.content}</h3>
                <div className='my-flex-start'>
                    <button className='button margin-top' onClick={function(){editPost(post._id)}}>EDIT</button>
                    <button className='button red-bg margin-top margin-left' onClick={function(){postDelete(post._id)}} disabled={disable}>DELETE</button>
                </div>
            </div>
        </>
    )
}

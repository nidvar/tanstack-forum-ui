import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';


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
    const { postId } = Route.useParams();
    const {data: post} = useSuspenseQuery(postQueryOptions(postId));

    const postDelete = function(id: string){
        deletePost(id);
        navigate({ to: '/posts' });
    };

    return (
        <>
            <div className='main post-details'>
                <Link to='/posts' className='blue underline'>{'<-'} Back to posts</Link>
                <h1>{post.title}</h1>
                <h3>{post.summary}</h3>
                <p>{post.description}</p>
                <div className='my-flex'>
                    <button className='link-button red-bg' onClick={function(){postDelete(post.id)}}>DELETE</button>
                </div>
            </div>
        </>
    )
}

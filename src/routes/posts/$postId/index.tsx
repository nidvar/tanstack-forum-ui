import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import {singlePost} from '../../../lib/axios';

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
    const { postId } = Route.useParams();
    const {data: post} = useSuspenseQuery(postQueryOptions(postId));
    return (
        <>
            <div className='main post-details'>
                <h1>{post.title}</h1>
                <h3>{post.summary}</h3>
                <p>{post.description}</p>
                <div className='my-flex'>
                    <Link to='/posts' className='link-button'>BACK</Link>
                </div>
            </div>
        </>
    )
}

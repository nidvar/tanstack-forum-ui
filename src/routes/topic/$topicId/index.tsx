import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import type { Topic } from '../../../types'

const fetchTopic = async function(topicId: string): Promise<Topic>{
    const res = await fetch('http://localhost:8000/ideas/' + topicId);
    if(!res.ok){
        console.log('failed response');
        throw new Error('Fail !!!')
    }else{
        const data = await res.json();
        console.log(data);
        return data;
    }
}

const topicQueryOptions = function(topicId: string){
    return queryOptions({
        queryKey: ['topic', topicId],
        queryFn: function(){return fetchTopic(topicId)}
    })
}

export const Route = createFileRoute('/topic/$topicId/')({
    head: () => ({
        meta: [{ title: 'Jarro - New Topic' },]
    }),
    component: TopicDetailsPage,
    loader: async function({params, context: { queryClient }}){
        return queryClient.ensureQueryData(topicQueryOptions(params.topicId))
    }
})

function TopicDetailsPage() {
    const { topicId } = Route.useParams();
    const {data: topic} = useSuspenseQuery(topicQueryOptions(topicId))
    return (
        <>
            <div className='main topic-details'>
                <h1>{topic.title}</h1>
                <h3>{topic.summary}</h3>
                <p>{topic.description}</p>
                <Link to='/' className='link-button'>Back Home</Link>
            </div>
        </>
    )
}

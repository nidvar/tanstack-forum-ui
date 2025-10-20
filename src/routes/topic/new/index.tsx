import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/new/')({
    head: ()=> ({
        meta: [{title: 'Jarro - Forum'},]
    }), 
    component: NewTopicPage,
})

function NewTopicPage() {
    return <div>New Topic</div>
}

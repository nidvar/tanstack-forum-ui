import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/new/')({
    head: ()=> ({
        meta: [{title: 'Jarro - Forum'},]
    }), 
    component: NewPostPage,
})

function NewPostPage() {
    return <div>New Topic</div>
}

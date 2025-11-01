import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$profileId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { profileId } = Route.useParams();
    return (
        <>
            <div className='main margin-top-xl'>
                <h1>Profile - {profileId }</h1>
            </div>
        </>
    )
}

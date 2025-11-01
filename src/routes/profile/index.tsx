import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        <div className='main margin-top-xl'>
            <h1>Profile</h1>
        </div>
    </>
  )
}

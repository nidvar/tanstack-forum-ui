import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/logout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        <div className='logout-page'>
            <p>Successfully logged out</p>
            <Link to='/' className='center blue underline'>Back</Link>
        </div>
    </>
  )
}

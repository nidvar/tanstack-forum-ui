import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className='main'>
      <h1>Forum</h1>
      <Link to='/posts'>Posts</Link>
    </div>
  )
}

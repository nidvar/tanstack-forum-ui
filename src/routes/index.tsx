import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center bg-red-50">
      <h1>Forum</h1>
      <Link to='/posts'>Posts</Link>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/new/')({
  component: NewTopicPage,
})

function NewTopicPage() {
  return <div>Hello "/topic/"!</div>
}

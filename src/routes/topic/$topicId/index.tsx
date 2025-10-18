import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/$topicId/')({
  component: TopicDetailsPage,
})

function TopicDetailsPage() {
  return <div>Hello "/topic/$topicId/"!</div>
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/leads')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/leads"!</div>
}

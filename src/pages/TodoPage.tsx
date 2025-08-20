import { TodoTableCard } from "../components/TodoTableCard"

export function TodoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Todo Management App</h1>
      <TodoTableCard />
    </div>
  )
}

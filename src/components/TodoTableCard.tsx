"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react"
import useTodoStore from "@/stores/useTodoStore"
import { useEffect, useState } from "react"
import { TodoFormModal } from "./TodoFormModal"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export function TodoTableCard() {
  const { todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodoStore()
  const [filter, setFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTodo, setCurrentTodo] = useState<{ id: string; title: string; description?: string } | null>(null)

  const itemsPerPage = 5

  useEffect(() => {
    console.log("[v0] Component mounted, fetching todos...")
    fetchTodos()
  }, [fetchTodos])

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(filter.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(filter.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage)
  const paginatedTodos = filteredTodos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAddTodo = () => {
    setCurrentTodo(null)
    setIsDialogOpen(true)
  }

  const handleEditTodo = (todo: { id: string; title: string; description?: string }) => {
    setCurrentTodo(todo)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (data: { title: string; description?: string }) => {
    try {
      if (currentTodo) {
        await updateTodo(currentTodo.id, data)
        toast.success("Todo updated successfully")
      } else {
        await addTodo({ ...data, completed: false })
        toast.success("Todo added successfully")
      }
    } catch (error) {
      toast.error("Failed to save todo")
      console.error("Operation failed:", error)
    } finally {
      setIsDialogOpen(false)
    }
  }

  if (loading && todos.length === 0) return <div className="p-4">Loading todos...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

  console.log("[v0] Current todos:", todos)
  console.log("[v0] Loading state:", loading)
  console.log("[v0] Error state:", error)

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Todo List</CardTitle>
              <CardDescription>Manage your tasks efficiently</CardDescription>
            </div>
            <Button onClick={handleAddTodo}>
              <Plus className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by title or description..."
              className="pl-8"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          {paginatedTodos.length === 0 && !loading ? (
            <div className="text-center py-8 text-muted-foreground">
              {filter ? "No todos match your search." : "No todos found. Add your first todo!"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTodos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={Boolean(todo.completed)}
                        onChange={() => toggleComplete(todo.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </TableCell>
                    <TableCell className={todo.completed ? "line-through text-gray-400" : ""}>
                      <Link to={`/todos/${todo.id}`} className="hover:underline">
                        {todo.title}
                      </Link>
                    </TableCell>
                    <TableCell className={todo.completed ? "line-through text-gray-400" : ""}>
                      {todo.description || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditTodo(todo)} disabled={loading}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteTodo(todo.id)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {paginatedTodos.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{" "}
              {Math.min(currentPage * itemsPerPage, filteredTodos.length)}
            </strong>{" "}
            of <strong>{filteredTodos.length}</strong> tasks
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0 || loading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <TodoFormModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        todo={currentTodo || undefined}
        onSubmit={handleSubmit}
        isSubmitting={loading}
      />
    </>
  )
}

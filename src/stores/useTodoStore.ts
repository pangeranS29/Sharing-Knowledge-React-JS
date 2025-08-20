import { create } from "zustand"
import TodoApi from "../services/resources/todo-api"

interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
}

interface ApiTodo {
  id: string
  title: string
  description?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

interface TodoStore {
  todos: Todo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (todo: Omit<Todo, "id">) => Promise<Todo>
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<Todo>
  deleteTodo: (id: string) => Promise<void>
  toggleComplete: (id: string) => Promise<void>
}

const mapApiTodoToTodo = (apiTodo: ApiTodo): Todo => ({
  id: apiTodo.id,
  title: apiTodo.title,
  description: apiTodo.description,
  completed: apiTodo.is_completed,
})

const mapTodoToApiTodo = (
  todo: Partial<Todo>,
): Partial<{ title: string; description?: string; completed: boolean }> => ({
  title: todo.title,
  description: todo.description,
  completed: todo.completed,
})

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    console.log("[v0] Starting to fetch todos from API...")
    set({ loading: true, error: null })

    try {
      const apiTodos = await TodoApi.getAllTodos()
      console.log("[v0] Raw API response:", apiTodos)
      const todos = Array.isArray(apiTodos) ? apiTodos.map(mapApiTodoToTodo) : []
      console.log("[v0] Mapped todos:", todos)
      set({ todos, loading: false })
    } catch (error) {
      console.error("[v0] Error in fetchTodos:", error)
      set({ error: "Failed to fetch todos", loading: false })
      throw error
    }
  },

  addTodo: async (todo) => {
    set({ loading: true, error: null })
    try {
      console.log("[v0] Adding todo via API:", todo)
      const apiTodo = await TodoApi.createTodo(todo)
      console.log("[v0] API response for new todo:", apiTodo)

      const newTodo = mapApiTodoToTodo(apiTodo)

      set((state) => ({
        todos: [newTodo, ...state.todos],
        loading: false,
      }))
      return newTodo
    } catch (error) {
      console.error("[v0] Error adding todo:", error)
      set({ error: "Failed to add todo", loading: false })
      throw error
    }
  },

  updateTodo: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      console.log("[v0] Updating todo via API:", id, updates)
      const apiTodo = await TodoApi.updateTodo(id, mapTodoToApiTodo(updates))
      console.log("[v0] API response for updated todo:", apiTodo)

      const updatedTodo = mapApiTodoToTodo(apiTodo)

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
        loading: false,
      }))
      return updatedTodo
    } catch (error) {
      console.error("[v0] Error updating todo:", error)
      set({ error: "Failed to update todo", loading: false })
      throw error
    }
  },

  deleteTodo: async (id) => {
    set({ loading: true, error: null })
    try {
      console.log("[v0] Deleting todo via API:", id)
      await TodoApi.deleteTodo(id)
      console.log("[v0] Todo deleted successfully from API")

      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
      }))
    } catch (error) {
      console.error("[v0] Error deleting todo:", error)
      set({ error: "Failed to delete todo", loading: false })
      throw error
    }
  },

  toggleComplete: async (id) => {
    const todo = get().todos.find((t) => t.id === id)
    if (todo) {
      await get().updateTodo(id, {
        completed: !todo.completed,
      })
    }
  },
}))

export default useTodoStore

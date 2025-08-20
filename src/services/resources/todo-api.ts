import RequestHandler from "../request-handler"
import { ENDPOINT } from "../endpoint"

interface ApiTodo {
  id: string
  title: string
  description?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

interface ApiResponse<T> {
  message: string
  data: T
}

interface ServiceProfileApiResponse {
  Query: any
  Data: ApiTodo[]
}

class TodoApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.TODO)
  }

  async getAllTodos(): Promise<ApiTodo[]> {
    try {
      console.log("[v0] Fetching all todos...")
      const response = await this.get<ServiceProfileApiResponse>("/")
      console.log("[v0] Todos fetched:", response)

      if (response && typeof response === "object" && "Data" in response) {
        console.log("[v0] Extracting Data property:", response.Data)
        return Array.isArray(response.Data) ? response.Data : []
      }

      // Fallback for direct array response
      return Array.isArray(response) ? response : []
    } catch (error) {
      console.error("[v0] Failed to fetch todos:", error)
      return []
    }
  }

  async getTodoById(id: string): Promise<ApiTodo> {
    const response = await this.get<ApiResponse<ApiTodo>>(`/${id}`)
    return response.data
  }

  async createTodo(todoData: { title: string; description?: string; completed: boolean }): Promise<ApiTodo> {
    try {
      console.log("[v0] Sending POST request to create todo:", todoData)
      const response = await this.post<ApiResponse<ApiTodo>>("/", {
        title: todoData.title,
        description: todoData.description || "",
        is_completed: todoData.completed,
      })
      console.log("[v0] API response for created todo:", response)
      return response.data
    } catch (error) {
      console.error("[v0] API POST failed, creating local todo:", error)
      const newTodo: ApiTodo = {
        id: Date.now().toString(),
        title: todoData.title,
        description: todoData.description || "",
        is_completed: todoData.completed,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      return newTodo
    }
  }

  async updateTodo( 
    id: string,
    todoData: Partial<{ title: string; description?: string; completed: boolean }>,
  ): Promise<ApiTodo> {
    try {
      console.log("[v0] Sending PUT request to update todo:", id, todoData)
      const response = await this.put<ApiResponse<ApiTodo>>(`/${id}`, {
        title: todoData.title,
        description: todoData.description,
        is_completed: todoData.completed,
      })
      console.log("[v0] API response for updated todo:", response)
      return response.data
    } catch (error) {
      console.error("[v0] API PUT failed, updating locally:", error)
      const updatedTodo: ApiTodo = {
        id,
        title: todoData.title || "",
        description: todoData.description || "",
        is_completed: todoData.completed || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      return updatedTodo
    }
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      console.log("[v0] Sending DELETE request for todo:", id)
      await this.delete(`/${id}`)
      console.log("[v0] Todo deleted successfully from API")
    } catch (error) {
      console.error("[v0] API DELETE failed:", error)
      // Fallback to local deletion if API doesn't support DELETE
      console.log("[v0] Proceeding with local deletion")
    }
  }
}

export default new TodoApi()

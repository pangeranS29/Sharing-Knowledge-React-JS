import axios from "axios"

const API_URL = "https://service-profile.vercel.app"

class RequestHandler {
  private baseUrl: string

  constructor(endpoint: string) {
    this.baseUrl = `${API_URL}/${endpoint}`
  }

  protected async get<T>(path = ""): Promise<T> {
    try {
      console.log("[v0] Fetching from:", `${this.baseUrl}${path}`)
      const response = await axios.get(`${this.baseUrl}${path}`)
      console.log("[v0] API Response:", response.data)
      return response.data || []
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
      return [] as T
    }
  }

  protected async post<T>(path = "", data: any): Promise<T> {
    const response = await axios.post(`${this.baseUrl}${path}`, data)
    return response.data
  }

  protected async put<T>(path = "", data: any): Promise<T> {
    const response = await axios.put(`${this.baseUrl}${path}`, data)
    return response.data
  }

  protected async patch<T>(path = "", data: any): Promise<T> {
    const response = await axios.patch(`${this.baseUrl}${path}`, data)
    return response.data
  }

  protected async delete<T>(path = ""): Promise<T> {
    const response = await axios.delete(`${this.baseUrl}${path}`)
    return response.data
  }
}

export default RequestHandler

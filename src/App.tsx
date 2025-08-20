"use client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { TodoPage } from "../src/pages/TodoPage"
import { TodoDetailPage } from "../src/pages/TodoDetailPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
  {
    path: "/todos/:id",
    element: <TodoDetailPage />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
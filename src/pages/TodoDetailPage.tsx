import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTodoStore from "../stores/useTodoStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function TodoDetailPage() {
  const { id } = useParams();
  const { todos, fetchTodos } = useTodoStore();
  
  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos();
    }
  }, [fetchTodos, todos.length]);

  const todo = todos.find(t => t.id === id);

  if (!todo) return <div className="container mx-auto py-8 px-4">Loading...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className={todo.completed ? "line-through text-gray-400" : ""}>
            {todo.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">
                {todo.description || "No description"}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <p className="text-muted-foreground">
                {todo.completed ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/">Back to List</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface TodoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: {
    id: string;
    title: string;
    description?: string;
  };
  onSubmit: (data: { title: string; description?: string }) => Promise<void>;
  isSubmitting: boolean;
}

export function TodoFormModal({ open, onOpenChange, todo, onSubmit, isSubmitting }: TodoFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    if (open) {
      if (todo) {
        setFormData({
          title: todo.title,
          description: todo.description || ""
        });
      } else {
        setFormData({
          title: "",
          description: ""
        });
      }
    }
  }, [open, todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined
      });
    } catch (error) {
      // Error sudah ditangani di parent component
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{todo ? "Edit Todo" : "Add New Todo"}</DialogTitle>
          <DialogDescription>
            {todo ? "Update your todo item" : "Add a new todo to your list"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              minLength={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              disabled={isSubmitting}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting || formData.title.trim().length < 3} 
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
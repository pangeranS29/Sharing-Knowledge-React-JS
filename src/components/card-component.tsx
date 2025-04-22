import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = {
  header: {
    title: string;
    description?: string;
  };
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
};

export function CardComponent({
  header,
  children,
  onCancel,
  onSubmit,
}: CardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{header.title}</CardTitle>
        {header.description && (
          <CardDescription>{header.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}

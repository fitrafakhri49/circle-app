import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Thread() {
  return (
    <div className="flex w-full h-screen ">
      <div className="flex-1 ">
        <Card className="bg-transparent border-none shadow-none">
          <h1 className="text-6xl text-green-500">Circle</h1>
          <ul className="text-2xl flex flex-col gap-6 px-5">
            <li>Home</li>
            <li>Search</li>
            <li>Follow</li>
            <li>Profile</li>
            <Button className="bg-green-500 rounded-full">Create Post</Button>
          </ul>
        </Card>
      </div>

      <div className="flex-2 ">
        <Card className="rounded-none bg-transparent">
          <p></p>
        </Card>
      </div>

      <div className="flex-1 bg-red-600"></div>
    </div>
  );
}

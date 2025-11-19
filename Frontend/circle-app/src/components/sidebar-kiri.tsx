import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useNavigate, Link } from "react-router-dom";

// const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem("token");
// };

export function SidebarKiri() {
  // navigate("/login");
  return (
    <div className="flex-1 ">
      <h1 className="text-6xl text-green-500">Circle</h1>
      <Card className="bg-transparent border-none shadow-none flex flex-col">
        <ul className="text-2xl flex flex-col gap-6 px-5">
          <li>Home</li>
          <li>Search</li>
          <li>Follow</li>
          <li>Profile</li>
          <Button className="bg-green-500 rounded-full">Create Post</Button>
        </ul>
        <Button asChild className="bg-green-500 rounded-full cursor-pointer">
          <Link to="/login" className="">
            Button
          </Link>
        </Button>
      </Card>
    </div>
  );
}

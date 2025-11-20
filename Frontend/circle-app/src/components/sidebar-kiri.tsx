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

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function SidebarKiri() {
  const { token, logout } = useAuth();
  // const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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

        {token && (
          <Button
            onClick={handleLogout}
            className="bg-green-500 rounded-full cursor-pointer"
          >
            Logout
          </Button>
        )}
      </Card>
    </div>
  );
}

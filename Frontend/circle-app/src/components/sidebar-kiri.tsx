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
import { Search, House, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export function SidebarKiri() {
  const { token, logout } = useAuth();

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
          <Link to="/thread" className="flex items-center gap-2">
            <House /> <span>Home</span>
          </Link>
          <li className="cursor-pointer flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </li>
          <Link
            to="/thread/follow/follower"
            className="flex items-center gap-2"
          >
            <UserPlus /> <span>Following</span>
          </Link>
          <li className="cursor-pointer flex items-center gap-2">
            <UserPlus /> <span>Profile</span>
          </li>

          {token && (
            <Button
              onClick={handleLogout}
              className="bg-green-500 rounded-full cursor-pointer"
            >
              Logout
            </Button>
          )}
        </ul>
      </Card>
    </div>
  );
}

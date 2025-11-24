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
import { SidebarKiri } from "../components/sidebar-kiri";
import { RightSidebar } from "../components/sidebar-kanan";
import { PostThread } from "@/components/PostThread";
import { MainThread } from "@/components/MainThread";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1">
        <SidebarKiri />
      </div>
      <div className="flex flex-2 border-y flex-col overflow-hidden ">
        <div className="overflow-y-scroll ">
          <Outlet />
        </div>
      </div>

      <div className="flex-1">
        <RightSidebar />
      </div>
    </div>
  );
}

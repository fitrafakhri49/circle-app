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

import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 ">
        <SidebarKiri />
      </div>
      <div className="flex-2 h-screen border-y w-full">
        <div className="h-screen overflow-y-scroll scrollbar-hide">
          <Outlet />
        </div>
      </div>
      <div className="flex-1 ">
        <RightSidebar />
      </div>
    </div>
  );
}

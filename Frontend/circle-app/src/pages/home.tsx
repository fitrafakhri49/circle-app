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
import { SidebarKanan } from "../components/sidebar-kanan";
import { PostThread } from "@/components/PostThread";
import { MainThread } from "@/components/MainThread";

export function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1">
        <SidebarKiri />
      </div>
      <div className="flex flex-2 border-y flex-col overflow-hidden ">
        <h1 className="mb-6">Home</h1>
        <PostThread />
        <div className="overflow-y-scroll ">
          <MainThread />
        </div>
      </div>

      <div className="flex-1">{/* <SidebarKanan /> */}</div>
    </div>
  );
}

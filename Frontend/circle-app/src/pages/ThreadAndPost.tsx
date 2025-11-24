import { PostThread } from "../components/PostThread";
import { MainThread } from "../components/MainThread";

export function ThreadAndPost() {
  return (
    <div className="flex flex-2 border-y flex-col overflow-hidden ">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <PostThread />
        <MainThread />
      </div>
    </div>
  );
}

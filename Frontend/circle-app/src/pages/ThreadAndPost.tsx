import { PostThread } from "../components/PostThread";
import { MainThread } from "../components/MainThread";

export function ThreadAndPost() {
  return (
    <div className="flex flex-2 border-y flex-col overflow-hidden ">
      <div className="">
        <PostThread />
        <MainThread />
      </div>
    </div>
  );
}

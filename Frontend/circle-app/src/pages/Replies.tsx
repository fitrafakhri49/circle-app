import { ThreadReply } from "@/components/ThreadReply";
import { ThreadReplies } from "@/components/ThreadReplies";
import { PostReply } from "@/components/PostReply";

export function Replies() {
  return (
    <>
      <ThreadReply />
      <PostReply />
      <ThreadReplies />
    </>
  );
}

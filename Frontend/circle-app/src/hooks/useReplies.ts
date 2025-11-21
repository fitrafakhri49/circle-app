import { useContext } from "react";
import { ReplyContext } from "@/context/RepliesContext";

export const useReplies=()=>{
    const context = useContext(ReplyContext)
    if(!context){
        throw new Error("useReplies must be used within an ReplyProvider")
    }
    return context
}
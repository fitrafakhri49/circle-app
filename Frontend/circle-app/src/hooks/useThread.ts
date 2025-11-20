import { useContext } from "react";
import { ThreadContext } from "@/context/ThreadContext";

export const useThread=()=>{
    const context = useContext(ThreadContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthContext")
    }
    return context
}
import { useContext } from "react";
import { ThreadContext } from "@/context/ThreadContext";

export const useAuth=()=>{
    const context = useContext(ThreadContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
import type {  UserType } from "../types/UserType";
import type { ThreadType } from "./ThreadType";

export interface LikeType {
    user:UserType
    thread:ThreadType
    id:number
  }

import type {  UserType } from "../types/UserType";
import type { LikeType } from "./LikeType";
import type { ReplyType } from "./ReplyType";

export interface ThreadType {
    content: string;
    image: string |File;
    user: UserType; 
    id:number;
    number_of_replies: number;
    likes:LikeType
    replies:ReplyType
    number_of_likes:number
  }


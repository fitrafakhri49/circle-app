import type {  UserType } from "../types/UserType";

export interface ReplyType {
    content: string;
    image: string |File;
    user: UserType; 
    id:number;
  }

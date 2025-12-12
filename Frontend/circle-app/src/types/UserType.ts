export interface UserType {
  id: number;
  username: string;
  full_name: string;
  photo_profile?: string; 
  bio:string;
  is_following:boolean
  followers_count:number;
  following_count:number;
}




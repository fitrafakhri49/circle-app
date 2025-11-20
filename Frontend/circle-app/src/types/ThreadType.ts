export interface ThreadType {
    content: string;
    image: string |File,
    created_by_user_thread: UserType; 

  }

export interface UserType {
    id: number;
    username: string;
    full_name: string;
  };
  
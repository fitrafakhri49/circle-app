import React from "react";

import type { UserType } from "../types/UserType";
export const UserCard = ({ user }: { user: UserType }) => {
  return (
    <div className="user-card">
      <img
        src={
          user.photo_profile
            ? `http://localhost:3000${user.photo_profile}`
            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }
        alt={user.username}
        width={50}
        height={50}
      />
      <div>
        <h3>{user.full_name}</h3>
        <p>@{user.username}</p>
        {/* <button>{user.is_follow ? "Following" : "Follow"}</button> */}
      </div>
    </div>
  );
};

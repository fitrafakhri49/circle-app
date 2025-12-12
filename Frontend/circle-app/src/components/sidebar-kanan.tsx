import { useEffect, useState } from "react";
import type { UserType } from "@/types/UserType";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

export function RightSidebar() {
  const [users, setUsers] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/user");
        setUsers(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className=" text-white p-4 flex flex-col">
      <div className="bg-[#121212] rounded-2xl p-4 shadow-lg border border-gray-800">
        <h3 className="text-sm font-semibold mb-3">My Profile </h3>

        <div className="relative">
          <div className="h-20 w-full rounded-xl bg-gradient-to-r from-green-200 via-yellow-300 to-yellow-500" />
          <img
            src={
              users?.photo_profile
                ? `http://localhost:3000${users.photo_profile}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            className="w-14 h-14 rounded-full border-4 border-[#121212] absolute -bottom-7 left-4 object-cover"
            alt="profile"
          />
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-base">
                {users?.full_name ?? "User Name"}
              </h2>
              <p className="text-gray-400 text-xs">
                @{users?.username ?? "username"}
              </p>
            </div>
            <button
              onClick={() => navigate("/editProfile")}
              className="text-xs border border-gray-700 px-3 py-1 rounded-full hover:bg-gray-800 cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          <p className="text-sm text-gray-300 mt-2">{users?.bio ?? "Bio"}</p>

          {/* ✅ Followers & Following */}
          <div className="flex gap-4 mt-3 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">
                {users?.followers_count}
              </span>
              <span className="text-gray-400">Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">
                {users?.following_count}
              </span>
              <span className="text-gray-400">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

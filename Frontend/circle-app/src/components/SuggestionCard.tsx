import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import type { UserType } from "../types/UserType";
import { FollowContext } from "../context/FollowContext";

export const SuggestionCard = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const { follows, followUser } = useContext(FollowContext);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/api/v1/user");
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleFollowToggle = async (user: UserType) => {
    try {
      if (user.is_following) {
        await api.delete(`/api/v1/follows`, {
          params: { userId: user.id },
        });
      } else {
        await api.post(`/api/v1/follows`, null, {
          params: { userId: user.id },
        });
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_following: !u.is_following } : u
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getSuggestions = async () => {
      if (!currentUser) return;

      try {
        const usersRes = await api.get("/api/v1/follows/suggestions");

        const followedIds = follows.map((f: any) => f.following_id);

        const merged = usersRes.data.data
          .filter((u: UserType) => u.id !== currentUser.id)
          .map((u: UserType) => ({
            ...u,
            is_following: followedIds.includes(u.id),
          }))
          .filter((u: any) => !u.is_following);

        setUsers(merged);
      } catch (err) {
        console.log("getSuggestions error:", err);
      }
    };

    getSuggestions();
  }, [currentUser, follows]);
  return (
    <div className="bg-[#121212] rounded-2xl p-4 shadow-lg border border-gray-800 mt-5 mx-3">
      <h3 className="text-sm font-semibold mb-3">Suggested for you</h3>

      {users.length === 0 ? (
        <p className="text-xs text-gray-400">No suggestions found</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                <img
                  src={
                    user.photo_profile
                      ? `http://localhost:3000${user.photo_profile}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {user.full_name}
                  </p>
                  <p className="text-xs text-gray-400">@{user.username}</p>
                </div>
              </div>

              <button
                onClick={() => handleFollowToggle(user)}
                className={`px-5 py-2 rounded-full text-sm font-medium text-white transition cursor-pointer
                        ${
                          user.is_following
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }
                      `}
              >
                {user.is_following ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

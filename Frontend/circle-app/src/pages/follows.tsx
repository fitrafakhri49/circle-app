import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { UserCard } from "../components/userCard";
import { api } from "../services/api";
import type { UserType } from "../types/UserType";

export const FollowersPage = () => {
  const { type } = useParams<{ type: string }>(); // follower | following
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (tabType: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/v1/follows`, {
        params: { type: tabType },
      });

      const usersData = res.data.data.map((item: any) =>
        tabType === "follower" ? item.followers : item.following
      );

      setUsers(usersData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type) fetchUsers(type);
  }, [type]);

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

  if (!type) return <p>Halaman tidak ditemukan</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER + BUTTON SWITCH */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">
          {type === "follower" ? "Followers" : "Following"}
        </h2>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit">
          <button
            onClick={() => navigate("/thread/follow/follower")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer
              ${
                type === "follower"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            Followers
          </button>

          <button
            onClick={() => navigate("/thread/follow/following")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer
              ${
                type === "following"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            Following
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No {type} found</p>
      ) : (
        <div className="overflow-x-auto bg-transparent rounded-2xl shadow">
          <table className="w-full border-collapse">
            <thead className=" ">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Profile
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Username
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Full Name
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-none transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={
                        user?.photo_profile
                          ? `http://localhost:3000${user.photo_profile}`
                          : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">@{user.username}</td>

                  <td className="px-6 py-4 ">{user.full_name}</td>

                  <td className="px-6 py-4 text-center">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

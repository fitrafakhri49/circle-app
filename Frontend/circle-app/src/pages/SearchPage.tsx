import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { api } from "../services/api";
import type { UserType } from "../types/UserType";

export function SearchPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [followingIds, setFollowingIds] = useState<number[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/api/v1/user");
        const user = res.data.user;
        setCurrentUser(user);

        const ids = user.following_list?.map((u: any) => u.id) || [];
        setFollowingIds(ids);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);
  const handleFollowToggle = async (user: UserType) => {
    try {
      if (user.is_following) {
        await api.delete("/api/v1/follows", {
          params: { userId: user.id },
        });
      } else {
        await api.post("/api/v1/follows", null, {
          params: { userId: user.id },
        });
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_following: !u.is_following } : u
        )
      );
    } catch (error) {
      console.error("Follow toggle error:", error);
    }
  };

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/v1/user/all", {
          params: {
            search: debouncedSearch,
          },
        });

        const data = res.data.user;
        if (Array.isArray(data)) {
          const mapped = data.map((u: UserType) => ({
            ...u,
            is_following: followingIds.includes(u.id),
          }));

          setUsers(mapped);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch]);

  const filteredUsers = users.filter((user) => {
    const keyword = debouncedSearch.toLowerCase();
    const username = user.username.toLowerCase();
    const fullName = (user.full_name || "").toLowerCase();

    return username.includes(keyword) || fullName.includes(keyword);
  });

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search User</h1>

      <input
        type="text"
        placeholder="Search username..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {!loading && debouncedSearch && filteredUsers.length === 0 && (
        <p>User not found</p>
      )}

      {debouncedSearch && (
        <ul className="space-y-3">
          {filteredUsers.map((user) => {
            const isCurrentUser = currentUser?.id === user.id;

            return (
              <li
                key={user.id}
                className="border p-4 rounded-xl flex items-center gap-4 bg-white/5"
              >
                <img
                  src={
                    user.photo_profile
                      ? `http://localhost:3000${user.photo_profile}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  className="w-14 h-14 rounded-full object-cover border"
                  alt="profile"
                />

                <div className="flex flex-col flex-1">
                  <p className="font-semibold text-lg">
                    {user.username}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs text-blue-500">(You)</span>
                    )}
                  </p>
                  {user.full_name && (
                    <p className="text-sm text-gray-500">{user.full_name}</p>
                  )}
                </div>

                {!isCurrentUser && (
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
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FollowContext } from "./FollowContext";
import type { UserType } from "../types/UserType";

export const FollowProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserType | null>(null);
  const [suggestions, setSuggestions] = useState<UserType[]>([]);
  const [follows, setFollows] = useState<UserType[]>([]);

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

  const getFollows = async () => {
    try {
      const res = await api.get("/api/v1/follows?type=following");
      setFollows(res.data.data);
    } catch (err) {
      console.log("Get follows error:", err);
    }
  };

  const getSuggestions = async () => {
    try {
      const res = await api.get("/api/v1/follows/suggestions");
      setSuggestions(res.data.users);
    } catch (err) {
      console.log("Get suggestion error:", err);
    }
  };

  const followUser = async (id: number) => {
    try {
      await api.post(`/api/v1/follows?userId=${id}`);
      getFollows();
    } catch (err: any) {
      console.log("Follow error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (users) {
      getSuggestions();
      getFollows();
    }
  }, [users]);

  return (
    <FollowContext.Provider
      value={{
        follows,
        users,
        suggestions,
        followUser,
        getSuggestions,
        getFollows,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

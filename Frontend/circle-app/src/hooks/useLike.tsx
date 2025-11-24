import { useContext } from "react";
import { LikeContext } from "../context/LikeContext";

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) throw new Error("useLike must be used within a LikeProvider");
  return context;
};

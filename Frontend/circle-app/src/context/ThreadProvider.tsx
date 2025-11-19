import { useState } from "react";
import { ThreadContext } from "./ThreadContext";
import type { ThreadType } from "./ThreadContext";
import { api } from "@/services/api";

export const ThreadProvider = ({ children }: { children: React.ReactNode }) => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  //   const [loading, setLoading] = useState(false);
  //   const [idCounter, setIdCounter] = useState(1);

  const createThreads = (
    content: string,
    image: string,
    number_of_replies: number
  ) => {
    // setLoading(true);
    const newThread: ThreadType = {
      content,
      image,
      number_of_replies,
    };
    setThreads((prev) => [newThread, ...prev]);
    // setIdCounter((prev) => prev + 1);
    // setTimeout(() => setLoading(false), 500);
  };

  //   const deleteCart = (id: number) => {
  //     setLoading(true);
  //     setCarts((prev) => prev.filter((cart) => cart.id !== id));
  //     setTimeout(() => setLoading(false), 500);
  //   };

  //   const updateCartQuantity = (id: number, quantity: number) => {
  //     setCarts((prev) =>
  //       prev.map((cart) =>
  //         cart.id === id
  //           ? { ...cart, quantity: quantity < 1 ? 1 : quantity }
  //           : cart
  //       )
  //     );
  //   };

  return (
    <ThreadContext.Provider value={{ threads, createThreads }}>
      {children}
    </ThreadContext.Provider>
  );
};

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
    withCredentials: true,
  autoConnect: true
});


socket.on("connect", () => {
  console.log("SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("SOCKET ERROR:", err.message);
});
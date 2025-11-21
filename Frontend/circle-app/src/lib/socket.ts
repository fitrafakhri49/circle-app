import { io } from "socket.io-client";
const token = localStorage.getItem("token")
export const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
  reconnection: true,
  auth:{token}
});

socket.on("connect", () => {
  console.log("Socket Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Socket Disconnected:", reason);
});

socket.on("reconnect_attempt", () => {
  console.log("Mencoba reconnect...");
});

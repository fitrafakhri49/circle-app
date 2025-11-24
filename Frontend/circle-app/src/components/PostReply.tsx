import Profile from "../assets/img/profile_freepik.jpeg";
import AddImage from "../assets/img/AddImage.png";
import { Button } from "./ui/button";
import { useState, useEffect, useContext } from "react";
import { api } from "@/services/api";
import { useParams } from "react-router-dom";
import { socket } from "../lib/socket";
import { ReplyContext } from "../context/RepliesContext";
import type { ReplyType } from "@/types/ReplyType";

export function PostReply() {
  const [form, setForm] = useState({ content: "", image: "" });
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(0);
  const { id: threadId } = useParams<{ id: string }>();

  const replyContext = useContext(ReplyContext);
  if (!replyContext) return null;
  const { replies, setReplies } = replyContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!threadId) {
      setSuccessMessage("Thread ID tidak ditemukan");
      return;
    }

    if (!form.content.trim() && !file) return;

    try {
      const formData = new FormData();
      formData.append("content", form.content);
      if (file) formData.append("image", file);

      const res = await api.post(
        `/api/v1/reply?thread_id=${threadId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newReply: ReplyType = res.data.reply;
      socket.emit("new-reply", newReply);
      setReplies((prev) => [newReply, ...prev]);
      setSuccessMessage("Reply Terkirim");
      setForm({ content: "", image: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Gagal mengirim reply.");
    }
  };

  return (
    <div className="text-white px-4">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form className="flex gap-3 items-center" onSubmit={handleSubmit}>
        <img className="rounded-full w-10" src={Profile} alt="" />
        <input
          id="content"
          className="outline-none w-full"
          type="text"
          placeholder="What is Happening"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          id="image"
          className="hidden"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              setForm({
                ...form,
                image: URL.createObjectURL(e.target.files[0]),
              });
            }
          }}
        />
        <label htmlFor="image" className="cursor-pointer">
          <img className="w-10" src={AddImage} alt="" />
        </label>
        <Button
          className="bg-green-500 mr-10 cursor-pointer"
          disabled={loading > 0}
        >
          {loading > 0 ? `Wait ${loading}s` : "Post"}
        </Button>
      </form>

      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded-md"
        />
      )}
    </div>
  );
}

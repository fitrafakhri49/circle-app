import Profile from "../assets/img/profile_freepik.jpeg";
import AddImage from "../assets/img/AddImage.png";
import { Button } from "./ui/button";
import { useState, useEffect, useContext } from "react";
import { api } from "@/services/api";
import { ThreadContext } from "../context/ThreadContext";
import { socket } from "../lib/socket";

import type { ThreadType } from "../types/ThreadType";

export function PostThread() {
  const [form, setForm] = useState({ content: "", image: "" });
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(0);

  const threadContext = useContext(ThreadContext);
  if (!threadContext) return null;
  const { threads, setThreads } = threadContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content.trim() && !file) return;

    setLoading(3);
    try {
      const formData = new FormData();
      formData.append("content", form.content);
      if (file instanceof File) formData.append("image", file);

      const res = await api.post("/api/v1/thread", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newThread: ThreadType = res.data.thread;
      socket.emit("new-thread", newThread);
      setThreads((prev) => [newThread, ...prev]);
      setSuccessMessage("Thread terkirim!");
      setForm({ content: "", image: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Gagal mengirim thread.");
    }
  };
  useEffect(() => {
    if (loading <= 0) return;
    const timer = setInterval(() => setLoading((l) => l - 1), 1000);
    return () => clearInterval(timer);
  }, [loading]);
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
          onChange={handleChange}
        />
        <input
          id="image"
          className="hidden"
          type="file"
          onChange={handleFileChange}
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

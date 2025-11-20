import Profile from "../assets/img/profile_freepik.jpeg";
import AddImage from "../assets/img/AddImage.png";
import { Button } from "./ui/button";
import { useThread } from "../hooks/useThread";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { socket } from "../lib/socket";

export function PostThread() {
  const [form, setForm] = useState({ content: "", image: "" });
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(0);
  const { createThread } = useThread();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (loading <= 0) return;
    const timer = setInterval(() => setLoading((loading) => loading - 1), 1000);
    return () => clearInterval(timer);
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(10);
    try {
      const formData = new FormData();
      formData.append("content", form.content);
      if (file) formData.append("image", file);

      const res = await api.post("api/v1/thread", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newThread = res.data.thread;
      socket.emit("new-thread", newThread);

      setSuccessMessage("Thread terkirim!");
      setForm({ content: "", image: "" });
      setFile(null);
    } catch (error) {
      console.error(error);
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
        <Button className="bg-green-500 mr-10" disabled={loading > 0}>
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

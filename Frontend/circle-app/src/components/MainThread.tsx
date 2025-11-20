import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

type ThreadType = {
  id: number;
  content: string;
  image: string;
  number_of_replies: number;
};

export function MainThread() {
  const [like, setLike] = useState<{ [key: number]: boolean }>({});
  const [threads, setThreads] = useState<ThreadType[]>([]);

  const handleClick = (id: number) => {
    setLike((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("api/v1/thread", {});
        setThreads(res.data.threads);
      } catch (error) {
        console.error("Gagal Fetch Data Produk");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Threads</h1>

      {threads.map((thread) => (
        <div key={thread.id} className="mb-4 border-4">
          {thread.image && (
            <img
              src={`http://localhost:3000${thread.image}`}
              alt="thread"
              className="w-full rounded-md"
            />
          )}
          <p className="mt-2">{thread.content}</p>
          <p>Number of replies :{thread.number_of_replies}</p>
          <div
            onClick={() => handleClick(thread.id)}
            className="cursor-pointer"
          >
            <Heart className={like[thread.id] ? "bg-red-500" : ""} />
          </div>
        </div>
      ))}
    </div>
  );
}

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

export function UpdateProfile() {
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/user");
        setUser(res.data.user);
        setBio(res.data.user.bio || "");
        setPreview(
          res.data.user.photo_profile
            ? `http://localhost:3000${res.data.user.photo_profile}`
            : null
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("bio", bio);
      if (photo) formData.append("image", photo);

      const res = await api.put("/api/v1/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Link
            to="/thread"
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <ArrowBigLeft className="w-6 h-6" />
          </Link>
          <label className="block mb-1">Profile Photo</label>
          <input
            className="border-2 cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full mt-2 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md cursor-pointer"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

import Profile from "../assets/img/profile_freepik.jpeg";
import AddImage from "../assets/img/AddImage.png";
import { Button } from "./ui/button";
export function PostThread() {
  return (
    <div className="text-white px-4">
      <form className="flex gap-3 items-center">
        <img className="rounded-full w-10" src={Profile} alt="" />
        <input
          className="outline-none w-full"
          type="text"
          placeholder="What is Happening"
        />
        <input
          id="file-upload"
          className="hidden "
          type="file"
          placeholder="What is Happening"
          onChange={(e) => console.log(e.target.files?.[0])}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <img className="w-10" src={AddImage} alt="" />
        </label>
        <Button className="bg-green-500 cursor-pointer">Post</Button>
      </form>
    </div>
  );
}

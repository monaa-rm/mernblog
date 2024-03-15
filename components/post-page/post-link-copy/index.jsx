"use client";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "react-toastify";

const PostLinkCopy = ({ url }) => {
  const copyHandler = () => {
    navigator.clipboard.writeText(url);
    toast.success("کپی شد", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div>
      <BsLink45Deg
        onClick={copyHandler}
        className=" w-7 h-7 cursor-pointer text-zinc-600 transition-all duration-300 hover:text-blue-500"
      />
    </div>
  );
};

export default PostLinkCopy;

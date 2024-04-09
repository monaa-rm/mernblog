"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRef } from "react";
import { toast } from "react-toastify";

const NewComment = ({ params, text, parent_id }) => {
  const token = Cookies.get("token");
  const messageRef = useRef();
  const commentSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      message: messageRef.current.value,
      blog_slug: params.blog_slug,
      post_slug: params.post_slug,
      parent_id: parent_id == undefined ? "no-parent" : parent_id,
    };
    axios
      .post(`/api/comment/new-comment`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success("دیدگاه شما پس از بررسی منتشر خواهد شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        messageRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
        const message = error.response.data
          ? error.response.data.data
          : "خطا در ثبت دیدگاه ";
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const onKeyDownCntrl = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };
  return (
    <form className="flex flex-col gap-4" onKeyDown={onKeyDownCntrl}>
      <textarea
        ref={messageRef}
        className="w-full rounded-md border-2 border-zinc-300 bg-transparent outline-none p-3 text-zinc-600 focus:border-blue-400 "
        rows="7"
        placeholder="متن دیدگاه..."
      />
      <button
        type="submit"
        onClick={commentSubmiter}
        className="w-full bg-blue-500 p-2 hover:bg-blue-600 text-white rounded-md transition-all duration-500 "
      >
        {text}
      </button>
    </form>
  );
};

export default NewComment;

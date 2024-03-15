"use client";
import { likeNumber, likeToFalse, likeToTrue } from "@/store/slices/likeSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Liker = ({ post_id, show_num }) => {
  const token = Cookies.get("token");
  const [reloader, setReloader] = useState(-1);
  const dispatch = useDispatch();
  const liked = useSelector((store) => store.likeSlice.value);
  const likes_num = useSelector((store) => store.likeSlice.number) || 0;

  useEffect(() => {
    axios
      .get(`/api/post/post-is-liked/${post_id}`, {
        headers: { token: token },
      })
      .then((data) => {
      
        if (data.data.liked == true) {
          dispatch(likeToTrue());
        } else {
          dispatch(likeToFalse());
        }
        dispatch(likeNumber(data.data.like_num));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloader]);

  const addlike = () => {
    if (!token) {
      toast.info("برای لایک کردن باید وارد سایت شوید", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axios
      .get(`/api/user/liked/${post_id}`, {
        headers: { token: token },
      })
      .then((data) => {
  

        toast.success(data.data.message ?? "عملیات انجام شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setReloader(reloader * -1);
      })
      .catch((error) => {
        const message = error.response
          ? error.response.data.data
          : "خطا در لایک ";
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
  return (
    <div className="flex gap-2 items-center">
      {show_num == false ? null : <span>{likes_num}</span>}
      <BiLike
        onClick={() => addlike()}
        className={
          liked == true
            ? " cursor-pointer w-[22px] h-[22px] text-blue-600 transition-all duration-300 hover:text-blue-500"
            : " cursor-pointer w-[22px] h-[22px] text-zinc-600 transition-all duration-300 hover:text-blue-500"
        }
      />
    </div>
  );
};

export default Liker;

"use client";
import { bookmarkToFalse, bookmarkToTrue } from "@/store/slices/bookmarkSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Bookmarker = ({ post_id }) => {
  const token = Cookies.get("token");
  const [reloader, setReloader] = useState(-1);
  const dispatch = useDispatch();
  const bookmarked = useSelector(store=> store.bookmarkSlice.value)


  useEffect(() => {
    axios
      .get(`/api/post/post-is-bookmark/${post_id}`, {
        headers: { token: token },
      })
      .then((data) => {
        // setBookmarked(data.data.bookmarked);
        if(data.data.bookmarked == true){
          dispatch(bookmarkToTrue())
        }else{
          dispatch(bookmarkToFalse())

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloader]);


  const addBookmark = () => {
    if (!token) {
      toast.info("برای بوکمارک کردن باید وارد سایت شوید", {
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
      .get(`/api/user/bookmark/${post_id}`, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success(data.data.data ?? "عملیات انجام شد", {
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
        const message = error.response.data
          ? error.response.data.data
          : "خطا در بوکمارک ";
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
    <div>
      <BsFillBookmarkFill
        onClick={() => addBookmark()}
        className={
          bookmarked == true
            ? " cursor-pointer w-[22px] h-[22px] text-blue-600 transition-all duration-300 hover:text-blue-500"
            : " cursor-pointer w-[22px] h-[22px] text-zinc-600 transition-all duration-300 hover:text-blue-500"
        }
      />
    </div>
  );
};

export default Bookmarker;

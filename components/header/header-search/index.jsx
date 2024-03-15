"use client";

import { BsArrowLeftShort } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const HeaderSearch = () => {
  const [arrowShow, setarrowShow] = useState(false);
  const [search_in, setSeatch_in] = useState("posts");
  const [data, setData] = useState(-1);
  const [show_search_box, setShow_search_box] = useState(false);
  const req_delay = useRef();
  const searchBoxRef = useRef(null);
  const arrowRef = useRef(null);
  const searcher = () => {
    setData(-3);
    if (req_delay.current.value != "") {
      setarrowShow(true);
      const url = "/api/search";
      const formData = {
        search_in: search_in,
        query: req_delay.current.value,
      };
      clearTimeout(req_delay.current);
      setTimeout(() => {
        axios
          .post(url, formData)
          .then((data) => {
            setData(data.data.data);
          })
          .catch((err) => {
            console.log(err);
            setData(-2);
          });
      }, 1000);
    } else {
      setarrowShow(false);
      setData(-1);
    }
  };
  const handleOutsideClick = (e) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(e.target) &&
      arrowRef.current &&
      !arrowRef.current.contains(e.target) &&
      req_delay.current &&
      !req_delay.current.contains(e.target)
    ) {
      setShow_search_box(false);
      setData(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="hidden sm:block">
      <form
        onFocus={() => setShow_search_box(true)}
        className=" flex justify-center items-center border-2 bg-zinc-100 dark:bg-zinc-700 focus:border-blue-500 rounded-full w-[300px]  py-1 px-2"
      >
        <input
          ref={req_delay}
          onChange={searcher}
          placeholder="جستجو در مرن بلاگ ..."
          type="text"
          className=" placeholder-zinc-500 focus:placeholder-zinc-400 w-60 outline-none p-1 bg-transparent"
        />
        <div
          className=" w-6"
          ref={arrowRef}
          onClick={() => {
            setData(-1);
            setData(-3);
            searcher(req_delay.current.value);
          }}
        >
          <BsArrowLeftShort
            className={
              arrowShow == false
                ? " hidden w-8 h-8 text-zinc-600 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-300 rounded"
                : " w-8 h-8 text-zinc-600 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-300 rounded"
            }
          />
          <BsSearch
            className={
              arrowShow == false
                ? " w-5 h-5 text-zinc-600 dark:text-zinc-400"
                : " hidden w-5 h-5 text-zinc-600 dark:text-zinc-400"
            }
          />
        </div>
      </form>
      <div
        className={
          show_search_box == false
            ? "hidden"
            : " w-[300px] flex flex-col gap-1 bg-zinc-100 dark:bg-zinc-700 fixed top-16 p-2 rounded shadow-md shadow-[#0000002f]"
        }
        ref={searchBoxRef}
      >
        <div className="flex justify-center items-center gap-4 ">
          <span>جستجو در</span>
          <button
            onClick={(e) => {
              setSeatch_in("posts");
              e.preventDefault();
              e.stopPropagation();
              setData(-1);
            }}
            className={
              search_in == "posts"
                ? "transition-all duration-300 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 "
                : "transition-all duration-300 rounded-md hover:bg-blue-600 hover:text-white px-2 py-1 "
            }
          >
            پست ها
          </button>
          <button
            onClick={(e) => {
              setSeatch_in("users");
              e.preventDefault();
              e.stopPropagation();
              setData(-1);
            }}
            className={
              search_in == "users"
                ? "transition-all duration-300 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 "
                : "transition-all duration-300 rounded-md hover:bg-blue-600 hover:text-white px-2 py-1 "
            }
          >
            کاربران
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {data == -1 ? (
            <div className="text-sm text-center py-4 text-zinc-700 dark:text-white">
              لطفا جستجو کنید...
            </div>
          ) : data == -3 ? (
            <div className="text-sm text-center py-4 text-zinc-700 dark:text-white">
              در حال جستجو...
            </div>
          ) : data == -2 ? (
            <div className="text-sm text-center py-4 text-zinc-700 dark:text-white">
              خطا در بارگذاری اطلاعات...
            </div>
          ) : data == 0 ? (
            <div className="text-sm text-center py-4 text-zinc-700 dark:text-white">
              نتیجه ای یافت نشد...
            </div>
          ) : search_in == "posts" ? (
            data.map((post, i) => (
              <Link
                target="_blank"
                rel="noreferrer"
                href={`/blog/${post.user}/${post.slug}`}
                key={i}
                className="flex items-center justify-start gap-1 bg-white p-2 rounded hover:bg-zinc-200 dark:bg-zinc-500 dark:hover:bg-zinc-600 transition-all duration-300"
              >
                <div className="relative w-24 min-w-[96px] h-16 rounded-md border border-zinc-300 ">
                  <Image
                    fill
                    src={post.image}
                    sizes="100px"
                    alt="post_image"
                    className="object-cover rounded-md"
                  />
                </div>
                <span className="text-sm line-clamp-1">{post.title}</span>
              </Link>
            ))
          ) : search_in == "users" ? (
            data.map((user, i) => (
              <Link
                target="_blank"
                rel="noreferrer"
                href={`/blog/${user.username}`}
                key={i}
                className="flex items-center justify-start gap-1 bg-white p-2 rounded hover:bg-zinc-200  dark:bg-zinc-500 dark:hover:bg-zinc-600  transition-all duration-300"
              >
                <div className="relative w-24 min-w-[96px] h-16 rounded-md border border-zinc-300 ">
                  <Image
                    fill
                    src={user.image}
                    sizes="100px"
                    alt="blog_image"
                    className="object-cover rounded-md"
                  />
                </div>
                <span className="text-sm line-clamp-1">{user.blog_name}</span>
              </Link>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;

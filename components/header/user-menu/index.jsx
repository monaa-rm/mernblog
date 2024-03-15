"use client";
import LinkItem from "./link-item";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userIsActiveToFalse } from "@/store/slices/user_is_active";
import { setRoleValue } from "@/store/slices/roleSlice";
import { logedToFalse } from "@/store/slices/logedSlice";
import { setuserImageValue } from "@/store/slices/userImageSlice";
import { setusernameValue } from "@/store/slices/usernameSlice";

const UserMenu = ({ menuIsOpen, setmenuIsOpen }) => {
  const [logoutManager, setlogoutManager] = useState(-1);
  let user_role = useSelector((store) => store.roleSlice.value || 2);

  const router = useRouter();
  const dispatch = useDispatch();
  const user_blog_slug = useSelector((store) => store.usernameSlice.value);
  useEffect(() => {
    if (logoutManager == 1) {
      router.push("/sign-in");
    }
  }, [logoutManager]);

  const logouter = () => {
    setmenuIsOpen(-1);
    Cookies.set("token", "", { expires: 0 });

    setlogoutManager(1);

    dispatch(
      setuserImageValue(
        "https://secure.gravatar.com/avatar/username?s=60&d=identicon"
      )
    );

    dispatch(userIsActiveToFalse());
    dispatch(setRoleValue(4));
    dispatch(logedToFalse());
    dispatch(setusernameValue(""));
  };

  return (
    <div
      className={
        menuIsOpen == 1
          ? " z-50 w-[320px] h-[100vh] bg-[#292929] fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center transition-all duration-500"
          : " z-50 w-[320px] h-[100vh] bg-[#292929] fixed top-0 bottom-0 -left-[320px] -right-[100%] flex justify-center items-center transition-all duration-500"
      }
    >
      <div className=" flex flex-col gap-[1px] p-4">
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="وبلاگ من"
          link={`/blog/${user_blog_slug}`}
        />
        {user_role == 1 || user_role == 2 ? (
          <LinkItem
            setmenuIsOpen={setmenuIsOpen}
            title= "داشبورد"
            link={`/dashboard/default`}
          />
        ) : null}
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="تنظیمات"
          link="/setting"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="تبلیغات"
          link="/advertise"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="پیام ها"
          link="/notifications"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="دنبال کننده ها"
          link="/follow/followers"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="دنبال شونده ها"
          link="/follow/followings"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="ایجاد پست"
          link="/create-post"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="همه پست های من"
          link="/my-posts/all"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="پیش نویس های من"
          link="/my-posts/drafts"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="پست های منتشر شده"
          link="/my-posts/published"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="در انتظار تایید مدیر"
          link="/my-posts/waiting"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="تایید شده"
          link="/my-posts/accepted"
        />
        <LinkItem
          setmenuIsOpen={setmenuIsOpen}
          title="پست های بوک مارک شده"
          link="/my-posts/bookmarked"
        />

        <button
          onClick={logouter}
          className="w-[225px] text-center text-white transition-all duration-500 hover:bg-blue-500  py-2 rounded-md"
        >
          خروج
        </button>
      </div>
      <IoMdClose
        onClick={() => setmenuIsOpen(-1 * menuIsOpen)}
        className=" cursor-pointer w-8 h-8 text-white absolute top-2 left-2 "
      />
    </div>
  );
};

export default UserMenu;

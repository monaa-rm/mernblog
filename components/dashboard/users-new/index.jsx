"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewUsers = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [allUsers, setAllUsers] = useState(-1);
  const searchParams = useSearchParams();
  const [paginate, setPaginate] = useState(10);
  const [page_number, setPage_number] = useState(1);
  const [btns, setBtns] = useState([]);

  useEffect(() => {
    setPaginate(
      searchParams.get("paginate") == undefined
        ? 10
        : searchParams.get("paginate")
    );
    setPage_number(
      searchParams.get("page_number") == undefined
        ? 1
        : searchParams.get("page_number")
    );
  }, [searchParams.get("page_number"), searchParams.get("paginate")]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/user/new-users?paginate=${paginate}&page_number=${page_number}&new_user=1`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setAllUsers(data.data.users);
        const theNumber = Math.ceil(data.data.all_users_number / paginate);

        const myArray = Array.from(Array(theNumber).keys());
        let goalArray = [];
        myArray.map((item) => {
          if (
            item == 0 ||
            item == theNumber - 1 ||
            (item > Number(page_number) - 4 && item < Number(page_number) + 2)
          ) {
            goalArray.push(item);
          }
        });
        setBtns(goalArray);
      })
      .catch((err) => {
        console.log(err);
        setAllUsers(-2);
      });
  }, [paginate, page_number]);

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <>
        <title>کاربرهای جدید</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl px-12 md:px-0">کاربرهای جدید</div>
        <Link
          href={"/dashboard/users"}
          className="px-3 py-2 z-10 fixed top-[8.7rem] md:top-[8.3rem] text-white rounded-md left-12 bg-blue-500 hover:bg-blue-600 transition-all duration-500 "
        >
          همه کاربرها
        </Link>
      </div>
      <div className="my-12 flex justify-center items-center">
        {allUsers == -1 ? (
          <Loading />
        ) : allUsers == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : allUsers.length < 1 ? (
          <div>کاربری موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              {allUsers.map((item, i) => (
                <Link
                  href={`/dashboard/users/${item._id}`}
                  key={i}
                  className=" w-full relative flex flex-col gap-4 bg-white dark:bg-zinc-700 border-2 border-zinc-200 hover:border-blue-600  rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div>نام وبلاگ:{item.blog_name}</div>
                  <div>نام کاربری:{item.username}</div>
                  <div>شماره تماس: {`0${item.phone}`}</div>
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-sm bg-blue-500 text-white rounded-md w-20 h-8 flex justify-center items-center static md:absolute top-2 left-2 ">
                      {item.user_is_active == true ? "فعال" : "غیرفعال"}
                    </div>
                    <div className="text-sm bg-blue-500 text-white rounded-md w-20 h-8 flex justify-center items-center static md:absolute top-2 left-24 ">
                      {item.viewed == false ? "دیده نشده" : "دیده شده"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {allUsers.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setAllUsers(-1);
                goTopCtrl();
              }}
              key={i}
              className={
                page_number == btn + 1
                  ? "bg-orange-500 text-white w-7 h-7 hover:bg-orange-600 rounded-full flex justify-center items-center transition-all duration-300 "
                  : "bg-blue-500 text-white w-7 h-7 hover:bg-blue-600 rounded-full flex justify-center items-center transition-all duration-300 "
              }
              href={`/dashboard/${pagination_url}?paginate=${paginate}&page_number=${
                btn + 1
              }`}
            >
              {btn + 1}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default NewUsers;

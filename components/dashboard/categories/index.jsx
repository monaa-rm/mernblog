"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryMain = ({pagination_url}) => {
  const token = Cookies.get("token");
  const [allCategories, setAllCategories] = useState(-1);
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
    const url = `/api/dashboard/category/all?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setAllCategories(data.data.categories);
        const theNumber = Math.ceil(data.data.all_categories_number / paginate);
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
        setAllCategories(-2);
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
      <div className="flex items-center justify-between gap-2 relative ">
        <div className="text-xl px-12 md:px-0">همه دسته ها</div>
        <Link
          className="px-3 py-2 z-10 absolute -top-1 text-white rounded-md left-0  bg-blue-500 hover:bg-blue-600 transition-all duration-500 "
          href={"/dashboard/new-category"}
        >
          دسته جدید
        </Link>
      </div>
      <div className="my-12 flex justify-center items-center">
        {allCategories == -1 ? (
          <Loading />
        ) : allCategories == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : allCategories.length < 1 ? (
          <div>دسته ای موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              {allCategories.map((item, i) => (
                <Link
                  href={`/dashboard/categories/${item._id}`}
                  key={i}
                  className=" w-full relative flex flex-col gap-4 border-2 border-zinc-200 dark:bg-zinc-700 hover:border-blue-600   bg-white rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div>نام دسته:{item.title}</div>
                  <div>اسلاگ دسته:{item.slug}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setAllCategories(-1);
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
          ))}
      </div>
    </div>
  );
};

export default CategoryMain;

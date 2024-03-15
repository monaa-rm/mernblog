"use client";
import Loading from "@/app/loading";
import RemoveModal from "@/components/modals/remove";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyAds = () => {
  const token = Cookies.get("token");
  const [allAdvertises, setallAdvertises] = useState(-1);
  const [dataReloader, setDataReloader] = useState(-1);
  const [showRemoveModal, setShowRemoveModal] = useState(-1);
  const [removeUrl, setRemoveUrl] = useState("");

  useEffect(() => {
    const url = `/api/user/advertise/my-ads`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setallAdvertises(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setallAdvertises(-2);
      });
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <>
        <title> تبلیغ های من</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl"> تبلیغ های من</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {allAdvertises == -1 ? (
          <Loading />
        ) : allAdvertises == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : allAdvertises.length < 1 ? (
          <div>تبلیغی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-12 w-full">
              {allAdvertises.map((item, i) => (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  key={i}
                  className=" w-full relative flex flex-col gap-2 border-2 border-zinc-200 dark:hover:bg-zinc-800 hover:border-blue-600   rounded-md p-6 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm hidden sm:flex  bg-yellow-500 text-white rounded-md w-24 min-w-[96px] py-2 justify-center items-center">
                      {item.type == "banner"
                        ? "تبلیغ بنر"
                        : item.type == "post"
                        ? "تبلیغ پست"
                        : null}
                    </div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
                      <div className="text-sm flex sm:hidden bg-yellow-500 text-white rounded-md w-24 min-w-[96px] py-2 justify-center items-center">
                        {item.type == "banner"
                          ? "تبلیغ بنر"
                          : item.type == "post"
                          ? "تبلیغ پست"
                          : null}
                      </div>
                      {item.published == true ? (
                        <div className="text-sm bg-green-500 text-white rounded-md w-24 min-w-[96px] py-2  flex justify-center items-center">
                          منتشر شده
                        </div>
                      ) : (
                        <div className="text-sm bg-rose-500 text-white rounded-md w-24 min-w-[96px] py-2  flex justify-center items-center">
                          منتشر نشده
                        </div>
                      )}
                      <div className="text-sm bg-blue-300 text-white rounded-md w-28 min-w-[112px] py-2  flex justify-center items-center">
                        {item.createdAt}
                      </div>
                      <div className="text-sm bg-blue-300 text-white rounded-md w-28 min-w-[112px]  py-2 flex justify-center items-center">
                        انتشار برای {item.duration} روز
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-4">
                    <div className="ltr_dir px-3 break-words text-center sm:text-start mt-2 sm:mt-0 transition-all duration-500 text-blue-500 hover:text-blue-600">
                      {item.link}
                    </div>
                  </div>
                  {item.image && item.image != "no-img" ? (
                    <div className="my-2 flex flex-col-reverse sm:flex-row justify-center sm:justify-between flex-wrap items-center sm:items-end gap-4">
                      <div className="text-sm bg-blue-500 text-white rounded-md px-3 py-2 flex justify-center items-center">
                        آلت تصویر : {item.image_alt}
                      </div>
                      <div className="w-[200px] h-[200px] relative">
                        <Image
                          src={item.image}
                          alt="banner-image"
                          fill
                          sizes="256px"
                          className="object-cover rounded-md border-2 border-yellow-500"
                        />
                      </div>
                    </div>
                  ) : null}
                  <RemoveModal
                    removeUrl={removeUrl}
                    showRemoveModal={showRemoveModal}
                    setShowRemoveModal={setShowRemoveModal}
                    dataReloader={dataReloader}
                    setDataReloader={setDataReloader}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAds;

"use client";
import Loading from "@/app/loading";
import RemoveModal from "@/components/modals/remove";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdsIsOn = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [allAdvertises, setallAdvertises] = useState(-1);
  const searchParams = useSearchParams();
  const [paginate, setPaginate] = useState(10);
  const [page_number, setPage_number] = useState(1);
  const [btns, setBtns] = useState([]);
  const [dataReloader, setDataReloader] = useState(-1);
  const [showRemoveModal, setShowRemoveModal] = useState(-1);
  const [removeUrl, setRemoveUrl] = useState("");
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
    const url = `/api/dashboard/ads/all?paginate=${paginate}&page_number=${page_number}&on=1`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setallAdvertises(data.data.advertises);
        const theNumber = Math.ceil(data.data.all_advertises_number / paginate);
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
        setallAdvertises(-2);
      });
  }, [paginate, page_number, dataReloader]);

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewUpdater = (id, situation) => {
    const formData = {
      advertise_id: id,
      viewed: situation,
    };
    axios
      .post(`/api/dashboard/ads/update`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success(
          situation == false
            ? "تبلیغ به بررسی نشده تغییر پیدا کرد"
            : "تبلیغ  بررسی شد",
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setDataReloader(dataReloader * -1);
      })
      .catch((error) => {
        toast.error("خطا در بررسی تبلیغ ", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const publishUpdater = (id, situation) => {
    const formData = {
      advertise_id: id,
      published: situation,
    };
    axios
      .post(`/api/dashboard/ads/update`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success(
          situation == false
            ? "تبلیغ به منتشر نشده تغییر پیدا کرد"
            : "تبلیغ  منتشر شد",
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setDataReloader(dataReloader * -1);
      })
      .catch((error) => {
        toast.error("خطا در انتشار تبلیغ ", {
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
    <div className="flex flex-col gap-8 w-full">
      <>
        <title>همه تبلیغ های روشن</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl pt-12 md:pt-0">همه تبلیغ های روشن</div>
        <Link
          className="px-3 py-2 z-10 fixed  top-[8.7rem] md:top-[8.3rem] text-white rounded-md left-12 bg-blue-500 hover:bg-blue-600 transition-all duration-500 "
          href={"/dashboard/ads"}
        >
          همه تبلیغ ها
        </Link>
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
                <div
                key={i}
                className=" w-full relative flex flex-col gap-2 bg-white dark:bg-zinc-700 border-2 border-zinc-200 hover:border-blue-600   rounded-md p-6 transition-all duration-300 hover:bg-zinc-200 "
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-sm mb-2 bg-yellow-500 text-white rounded-md w-24 py-2 flex justify-center items-center">
                    {item.type == "banner"
                      ? "تبلیغ بنر"
                      : item.type == "post"
                      ? "تبلیغ پست"
                      : null}
                  </div>
                  <div className="flex items-center flex-wrap justify-center md:justify-end gap-1 md:gap-4">
                    <button
                      onClick={() => {setShowRemoveModal(true);setRemoveUrl(`/api/dashboard/ads/remove-ads/${item._id}`)}}
                      className="text-sm bg-rose-600 hover:bg-rose-700 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center"
                    >
                      حذف
                    </button>
                    {item.viewed == true ? (
                      <button
                        onClick={() => viewUpdater(item._id, false)}
                        className="text-sm bg-green-500 hover:bg-green-600 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center"
                      >
                        بررسی شده
                      </button>
                    ) : (
                      <button
                        onClick={() => viewUpdater(item._id, true)}
                        className="text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center"
                      >
                        بررسی نشده
                      </button>
                    )}

                    {item.published == true ? (
                      <button
                        onClick={() => publishUpdater(item._id, false)}
                        className="text-sm bg-green-500 hover:bg-green-600 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center"
                      >
                        منتشر شده
                      </button>
                    ) : (
                      <button
                        onClick={() => publishUpdater(item._id, true)}
                        className="text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center"
                      >
                        منتشر نشده
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-1 md:gap-4">
                  <Link
                    href={item.link}
                    target="_blank"
                    className="px-1 md:px-3 py-2  flex justify-center items-center rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 "
                  >
                    لینک هدف
                  </Link>
                  <Link
                    href={`/dashboard/users/${item.user_id}`}
                    target="_blank"
                    className="px-1 md:px-3 py-2  flex justify-center items-center rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 "
                  >
                    لینک جزئیات کاربر
                  </Link>
                  {item.post_id == "no-post" ? null : (
                    <Link
                      href={`/dashboard/posts/${item.post_id}`}
                      target="_blank"
                      className="px-1 md:px-3 py-2  flex justify-center items-center rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 "
                    >
                      لینک جزئیات پست
                    </Link>
                  )}
                  <div className="text-sm bg-blue-300 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center">
                    ایجاد شده در {item.createdAt}
                  </div>
                  <div className="text-sm bg-blue-300 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center">
                    انتشار برای {item.duration} روز
                  </div>
                </div>
                {item.image && item.image != "no-img" ? (
                  <div className="my-2 flex flex-col-reverse md:flex-row justify-center md:justify-between items-center md:items-end gap-1 md:gap-4">
                    <div className="text-sm bg-blue-500 text-white rounded-md px-1 md:px-3 py-2 flex justify-center items-center">
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
              </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4">
        {allAdvertises.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setallAdvertises(-1);
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

export default AdsIsOn;

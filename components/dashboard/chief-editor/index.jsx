"use client";
import Loading from "@/app/loading";
import RemoveModal from "@/components/modals/remove";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChiefEditorsMain = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [chiefEditor, setchiefEditor] = useState(-1);
  const searchParams = useSearchParams();
  const [paginate, setPaginate] = useState(10);
  const [page_number, setPage_number] = useState(1);
  const [btns, setBtns] = useState([]);
  const [dataReloader, setDataReloader] = useState(-1);
  const [showRemoveModal, setShowRemoveModal] = useState(-1);
  const [removeUrl, setRemoveUrl] = useState("");
  const numbers = [1, 2, 3, 4, 5];

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
    const url = `/api/dashboard/chief-editor/all?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setchiefEditor(data.data.chiefEditors);
        const theNumber = Math.ceil(
          data.data.all_chiefEditors_number / paginate
        );
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
        setchiefEditor(-2);
      });
  }, [paginate, page_number, dataReloader]);

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const numberUpdater = (id, num) => {
    const formData = {
      goalId: id,
      number: num,
    };
    axios
      .post(`/api/dashboard/chief-editor/update`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success("اطلاعات بروزرسانی شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDataReloader(dataReloader * -1);
      })
      .catch((error) => {
        const message =
          error.response && error.response.data
            ? error.response.data.data
            : "خطا در بروزرسانی ";
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
  const situationUpdater = (id, situation) => {
    const formData = {
      goalId: id,
      situation: situation == true ? false : true,
    };
    axios
      .post(`/api/dashboard/chief-editor/update`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        const toastMes =
          situation == true ? "پیشنهاد خاموش شد" : "پیشنهاد روشن شد";
        toast.success(toastMes, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDataReloader(dataReloader * -1);
      })
      .catch((error) => {
        const message =
          error.response && error.response.data
            ? error.response.data.data
            : "خطا در بروزرسانی ";
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
  const notifSender = (postSlug) => {
    const formData = {
      postSlug,
    };
 axios
      .post(`/api/dashboard/user/chief-editor-notif-create`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success("نوتیفیکیشن ارسال شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDataReloader(dataReloader * -1);
      })
      .catch((error) => {
        console.log(error);
        const message =
          error.response && error.response.data
            ? error.response.data.data
            : "خطا در ارسال نوتیفیکیشن ";
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
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl pt-12 md:pt-0">همه پیشنهادات سردبیر</div>
        <Link
          className="px-2 sm:px-6 h-8 flex items-center justify-center rounded-lg z-10 bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 fixed top-[8.7rem] md:top-[8.3rem]  left-12 "
          href={`/dashboard/new-chief-editor`}
        >
          پیشنهاد جدید
        </Link>
      </div>
      <div className="my-12 flex justify-center items-center">
        {chiefEditor == -1 ? (
          <Loading />
        ) : chiefEditor == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : chiefEditor.length < 1 ? (
          <div>پیشنهادی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-8 w-full">
              {chiefEditor.map((item, i) => (
                <div
                  key={i}
                  className=" w-full relative flex flex-col gap-4 bg-white dark:bg-zinc-700 border-2 border-zinc-200 hover:border-blue-600   rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div className="flex flex-col lg:flex-row justify-start sm:justify-between items-center gap-4">
                    <div className="flex gap-5">
                      شماره :{" "}
                      <div className="flex justify-start  flex-wrap items-center gap-2">
                        {numbers.map((num, j) => (
                          <button
                            key={j}
                            onClick={() => numberUpdater(item._id, num)}
                            className={
                              item.number == num
                                ? "w-6 h-6 flex justify-center items-center border-2 rounded-md border-indigo-600 hover:border-indigo-500 transition-all duration-300 "
                                : "w-6 h-6 flex justify-center items-center border-2 rounded-md border-zinc-300 hover:border-indigo-500 transition-all duration-300 "
                            }
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center  flex-wrap gap-2">
                      <button
                        onClick={() => notifSender(item.post_slug)}
                        type="button"
                        className="px-2 sm:px-6 h-8 flex items-center justify-center text-sm rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400"
                      >
                        ارسال نوتیفیکیشن
                      </button>
                      <button
                        onClick={() => {
                          setShowRemoveModal(1);
                          setRemoveUrl(
                            `/api/dashboard/chief-editor/remove-chief-editor/${item._id}`
                          );
                        }}
                        type="button"
                        className="px-2 sm:px-6 h-8 flex items-center justify-center text-sm rounded-lg bg-rose-600 transition-all duration-500 text-white hover:bg-rose-700"
                      >
                        حذف
                      </button>
                      <div className="text-sm bg-blue-500 text-white rounded-md px-1 sm:px-3 h-8 flex justify-center items-center">
                        ایجاد شده در {item.createdAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse sm:flex-row items-center flex-wrap gap-1 justify-between">
                    <button
                      onClick={() => situationUpdater(item._id, item.situation)}
                      className={
                        item.situation == false
                          ? "text-sm bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white rounded-md w-20 h-8 flex justify-center items-center "
                          : "text-sm bg-green-500 hover:bg-green-600 transition-all duration-300 text-white rounded-md w-20 h-8 flex justify-center items-center "
                      }
                    >
                      {item.situation == false ? "خاموش" : "روشن"}
                    </button>
                    <Link
                      href={`/blog/${item.blog_slug}/${item.post_slug}`}
                      target="_blank"
                      className="px-1 sm:px-3 h-8  flex justify-center items-center rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 "
                    >
                      لینک جزئیات پست
                    </Link>
                  </div>
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
        {chiefEditor.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setchiefEditor(-1);
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

export default ChiefEditorsMain;

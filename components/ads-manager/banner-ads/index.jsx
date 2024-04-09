"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { FiImage } from "react-icons/fi";

const BannerAds = ({setAd_situation}) => {
  const [image, setImage] = useState("");
  const linkRef = useRef();
  const durationRef = useRef();
  const image_altRef = useRef();
  const [selectedImg, setSelectedImg] = useState("");

  const token = Cookies.get("token");
 


  
  const formSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      type: "banner",
      image:  selectedImg,
      image_alt:  image_altRef.current.value,
      link: linkRef.current.value,
      duration: durationRef.current.value,
    };
    axios
      .post(`/api/user/advertise/new-ads`, formData, {
        headers: { token: token },
      })
      .then(() => {
        toast.success("تبلیغ بنری با موفقیت ایجاد شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAd_situation("my-ads")
      })
      .catch((error) => {
        console.log(error);
        const message = error.response.data
          ? error.response.data.data
          : "خطا در ذخیره ";
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

  const onKeyDownNotSubmit = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  const imageupdater = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/advertise/upload-image", e.target, {
        headers: { token: token },
      })
      .then((d) => {
        setSelectedImg(d.data.fileUrl);
        toast.success("تصویر آپلود شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        const message = error.response.data
          ? error.response.data.data
          : "خطا در فرایند آپلود تصویر";
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
    <div className="flex flex-col gap-2 w-full">
      <><title>ایجاد تبلیغ بنری</title></>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">ایجاد تبلیغ بنری</div>

      </div>

      <div className="flex flex-col gap-4 my-12">
        <div className=" flex flex-col gap-1">
          <div>تصویر بنر</div>
          <div className=" flex  justify-between items-center gap-2">
            <form
              onSubmit={imageupdater}
              className=" w-full  flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4"
            >
              <div className=" flex flex-wrap sm:flex-nowrap justify-center sm:justify-start w-full  gap-2 items-center">
                <div className=" relative w-40 h-32 flex justify-center items-center">
                  {selectedImg == "" ? (
                    <FiImage className="text-zinc-300 w-28 h-28 " />
                  ) : (
                    <Image
                      alt="user image"
                      fill
                      sizes="120px"
                      src={selectedImg}
                      className=" rounded-md object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className=" w-40 h-12 sm:h-24 flex justify-center items-center">
                    <input
                      onChange={(e) => {
                        setImage(e.target.files[0].name);
                      }}
                      id="file"
                      type="file"
                      name="file"
                    />
                    <div className="w-40 h-12 sm:h-24 flex justify-center items-center gap-2">
                      <label
                        className=" w-40 min-w-40 cursor-pointer  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                        htmlFor="file"
                      >
                        {image == "" ? "انتخاب عکس جدید" : image}
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col items-center sm:items-start gap-2 text-base text-zinc-600 sm:text-xs">
                  <div>حجم باید کمتر از 2 مگ باشد.</div>
                  <div>فقط PNG، JPG و JPEG</div>
                </div>
              </div>
              <button
                type="submit"
                className=" w-24 min-w-24  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
              >
                آپلود عکس
              </button>
            </form>
          </div>
        </div>
        <form
          onKeyDown={onKeyDownNotSubmit}
          onSubmit={formSubmiter}
          className="flex flex-col gap-4 w-full "
        >
        <div className="flex flex-col gap-2">
          <h4>آدرس هدف</h4>
          <input
            required
            ref={linkRef}
            autoComplete="off"
            placeholder={`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/mona-1995/photoshop-for-photography`}
            type="text"
            className="ltr_dir border-2 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
          />
        </div>
        <div className="flex flex-col gap-2">
          <h4>مدت زمان نمایش تبلیغ (بر مبنای روز)</h4>
          <input
            required
            ref={durationRef}
            autoComplete="off"
            type="number"
            className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
          />
        </div>
        <div className="flex flex-col gap-2">
          <h4>آلت تصویر - متن سئویی برای بنر شما</h4>
          <input
            required
            ref={image_altRef}
            autoComplete="off"
            type="text"
            className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
          />
        </div>
        <button
          className=" bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white flex justify-center items-center h-10 w-full rounded-md"
          type="submit"
        >
          ایجاد تبلیغ
        </button>
        </form>
      </div>
    </div>
  );
};

export default BannerAds;

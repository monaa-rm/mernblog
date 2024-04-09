"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Loading from "@/app/loading";
import Image from "next/image";
import { FiImage } from "react-icons/fi";
import { BsArrowBarLeft } from "react-icons/bs";
import RemoveModal from "@/components/modals/remove";

const PostDetails = ({ goalId }) => {
  const [image, setImage] = useState("");
  const [defaultDataReloader, setDefaultDataReloader] = useState(-1);
  const [showRemoveModal, setShowRemoveModal] = useState(-1);
  const removeUrl = `/api/post/post-remove/${goalId}`;

  const [PostData, setPostData] = useState(-1);

  const titleRef = useRef();
  const slugRef = useRef();
  const short_descRef = useRef();
  const long_descRef = useRef();
  const tagRef = useRef();
  const publishedRef = useRef();

  const [tag, setTag] = useState([]);
  const [cats, setCats] = useState([]);
  const [categories, setCategories] = useState(-1);
  const [selectedImg, setSelectedImg] = useState("");

  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    const url = `/api/post/post-details/${goalId}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setPostData(data.data.data);
        setSelectedImg(data.data.data.image);
        setCats(data.data.data.categories);
        setTag(data.data.data.tags);
      })
      .catch((err) => {
        console.log(err);
        const statusCode = err.response.status ? err.response.status : 401;
        statusCode == 403 ? setPostData(-3) : setPostData(-2);
      });
  }, [defaultDataReloader]);
  useEffect(() => {
    axios
      .get("/api/dashboard/category/all?paginate=1000&page_number=1")
      .then((data) => {
        setCategories(data.data.categories);
      })
      .catch((err) => {
        console.log(err);
        setCategories(-2);
      });
  }, []);

  const formSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      goalId: goalId,
      title: titleRef.current.value,
      slug: slugRef.current.value,
      short_desc: short_descRef.current.value,
      long_desc: long_descRef.current.value,
      tags: tag,
      published: publishedRef.current.value == "true" ? true : false,
      categories: cats,
      image: selectedImg,
    };
    axios
      .post(`/api/post/update-post`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success("مقاله با موفقیت ویرایش شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/my-posts/all");
      })
      .catch((error) => {
        console.log(error);
        const message = error.response.data
          ? error.response.data.data
          : "خطا در ویرایش مقاله ";
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
  //TAGS
  const tagsSuber = (e) => {
    if (e.key === "Enter") {
      let tagList = [...tag];
      const data = tagRef.current.value;
      if (data.length > 0) {
        tagList = [...tag, data.replace(/\s+/g, "_").toLowerCase()];
        setTag(tagList);
      }
      tagRef.current.value = "";
    }
  };
  const tagDeleter = (indexToRemove) => {
    setTag(tag.filter((_, i) => i != indexToRemove));
  };
  const categoryManager = (e) => {
    let myCats = [...cats];
    if (e.target.checked) {
      myCats = [...myCats, e.target.value];
    } else {
      myCats.splice(cats.indexOf(e.target.value), 1);
    }
    setCats(myCats);
  };

  const imageupdater = (e) => {
    e.preventDefault();
    axios
      .post("/api/post/new-post/upload-image", e.target, {
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
      <>
        <title>جزئیات پست</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">جزئیات پست</div>
        <div
          className="w-10 h-10 fixed top-[8rem] left-2 sm:left-12 cursor-pointer"
          onClick={() => router.back()}
        >
          <BsArrowBarLeft className=" p-2 w-10 h-10 bg-zinc-200 dark:text-black rounded-md hover:bg-zinc-300 transition-all duration-500 " />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {PostData == -1 || categories == -1 ? (
          <Loading />
        ) : PostData == -2 || categories == -2 ? (
          <div className="flex justify-center items-center">
            خطا در دریافت اطلاعات پیش فرض
          </div>
        ) : PostData == -3 ? (
          <div className="flex justify-center items-center">
            شما اجازه دسترسی به این محتوا را ندارید
          </div>
        ) : (
          <div className="flex flex-col gap-4 my-8">
            <div className=" flex items-center flex-wrap justify-start gap-2 ">
              <div className="text-sm bg-zinc-100 dark:text-black rounded-md px-3 py-1 ">
                {PostData.likes_num} لایک
              </div>
              <div className="text-sm bg-zinc-100 dark:text-black rounded-md px-3 py-1 ">
                {PostData.view_num} بازدید
              </div>
              <div className="text-sm bg-zinc-100 dark:text-black rounded-md px-3 py-1 ">
                زمان مطلالعه: {PostData.time} دقیقه
              </div>
              <div className="text-sm bg-zinc-100 dark:text-black rounded-md px-3 py-1 ">
                تاریخ ایجاد: {PostData.createdAt}
              </div>
              <div className="text-sm bg-zinc-100 dark:text-black rounded-md px-3 py-1 ">
                آخرین بروز رسانی: {PostData.createdAt}
              </div>

              <div className="text-sm bg-zinc-100 dark:text-black rounded-md px-3 py-1 ">
                تایید مدیر:{" "}
                {PostData.manager_accept == true ? "تایید شده" : "تایید نشده"}
              </div>
            </div>

            <div className=" flex flex-col gap-1">
              <div>تصویر پست</div>
              
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
                          sizes="256px"
                          fill
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
              <div className="flex items-center justify-end gap-2 fixed top-[8rem] left-14 sm:left-24">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 "
                >
                  ذخیره
                </button>
                <button
                  onClick={() => setShowRemoveModal(1)}
                  type="button"
                  className="px-6 py-2 rounded-lg bg-rose-600 transition-all duration-500 text-white hover:bg-rose-700"
                >
                  حذف
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <h4>عنوان مقاله</h4>
                <input
                  required
                  defaultValue={PostData.title}
                  ref={titleRef}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>آدرس مقاله (url)</h4>
                <input
                  required
                  defaultValue={PostData.slug}
                  ref={slugRef}
                  autoComplete="off"
                  type="text"
                  className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>توضیحات کوتاه</h4>
                <input
                  required
                  defaultValue={PostData.short_desc}
                  ref={short_descRef}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>توضیحات کامل</h4>
                <textarea
                  rows={5}
                  required
                  defaultValue={PostData.long_desc}
                  ref={long_descRef}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>انتشار پست</h4>
                <select
                  ref={publishedRef}
                  defaultValue={PostData.published}
                  className=" border-2 cursor-pointer border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                >
                  <option value={true}>انتشار</option>
                  <option value={false}>ذخیره به صورت پیش نویس</option>
                </select>
              </div>
              <div className=" tags w-full flex flex-col gap-2">
                <h3>برچسب ها</h3>
                <div className=" tags w-full flex flex-col gap-4">
                  <div className=" input  flex items-center gap-2">
                    <input
                      type="text"
                      ref={tagRef}
                      onKeyDown={tagsSuber}
                      placeholder="تگ را وارد کنید و انتر بزنید"
                      className=" border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                    />
                  </div>
                  <div className="tagResults w-full flex gap-3 justify-start flex-wrap ">
                    {tag.map((t, i) => (
                      <div
                        key={i}
                        className="res flex gap-1 border-2 border-zinc-300 text-sm rounded-md p-1"
                      >
                        <i className="text-indigo-500 flex gap-[3px] items-center ">
                          <span className="text-xs">{t}</span>
                          <IoMdClose
                            className="text-sm cursor-pointer"
                            onClick={() => tagDeleter(i)}
                          />
                        </i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" tags w-full flex flex-col gap-2">
                <h3>دسته ها</h3>
                <div className=" tags w-full flex flex-col gap-4">
                  <div className="tagResults w-full flex gap-3 justify-start flex-wrap ">
                    {categories.length == 1 ? (
                      <div>دسته بندی موجود نیست</div>
                    ) : (
                      categories.map((cat, index) => (
                        <div
                          key={index}
                          className="res flex gap-1 flex-wrap border-2 border-zinc-300 text-sm rounded-md p-1 cursor-pointer"
                        >
                          <label htmlFor={cat._id}>{cat.title}</label>
                          <input
                            onChange={categoryManager}
                            defaultChecked={cats.includes(cat._id)}
                            value={cat._id}
                            type="checkbox"
                            id={cat._id}
                            name={cat._id}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <RemoveModal
        removeUrl={removeUrl}
        showRemoveModal={showRemoveModal}
        setShowRemoveModal={setShowRemoveModal}
      />
    </div>
  );
};

export default PostDetails;

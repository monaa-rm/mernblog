import Image from "next/image";
import Link from "next/link";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";

const NewBlogBox = ({ data, blog_url }) => {
  return (
    <article className="  relative w-full h-[16.5rem] dark:bg-zinc-600 flex items-center p-3  bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.25)]  rounded-lg transition-all duration-500 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.35)]">
      <div className=" w-full   flex justify-start items-start gap-4">
        <div className=" flex justify-center items-center">
          <Link
            target="_blank"
            href={`/blog/${blog_url}/${data.slug}`}
            className=" relative w-[20rem]  rounded-lg  h-[15rem]"
          >
            <Image
            sizes="400px"
              src={data.image}
              alt={data.title}
              fill
              className="object-cover rounded-md"
            />
          </Link>
        </div>
        <div className=" h-[15rem] w-full flex flex-col gap-2 justify-between  p-[.5rem]">
          <div className="flex flex-col gap-12">
            <Link target="_blank" href={`/blog/${blog_url}/${data.slug}`}>
              <h3 className=" line-clamp-2  h-12  transition-all duration-500 hover:text-blue-500">
                {data.title}
              </h3>
            </Link>
            <p className=" text-zinc-600 dark:text-white line-clamp-3 text-base sm:text-sm h-16">
              {data.short_desc}
            </p>
          </div>
          <div className=" flex justify-between items-center gap-1 mt-2  text-base sm:text-sm">
            <div className=" text-xs sm:text-base flex justify-start items-center gap-3">
              <div className=" flex justify-center items-center gap-1">
                <GoComment className=" w-5  h-5 text-blue-600" />
                <span>{data.commentsCount || 0}</span>
              </div>
              |
              <div className=" flex justify-center items-center gap-1">
                <BiLike className=" w-5  h-5 text-blue-600" />
                <span>{data.likes_num || 0}</span>
              </div>
              |
              <div className=" flex justify-center items-center gap-1">
                <FiEye className=" w-5  h-5 text-blue-600" />
                <span>{data.view_num || 0}</span>
              </div>
              |
              <div className=" flex justify-center items-center gap-1">
                <FaRegClock className=" w-5  h-5 text-blue-600" />
                <span className="text-sm">{data.time || 1} دقیقه</span>
              </div>
            </div>
            <div className=" flex justify-end items-center gap-4 absolute top-4 right-4 xl:static">
              <div className=" text-white bg-blue-500 px-3 py-1 rounded">
                {data.updatedAt}
              </div>
              <Link
                target="_blank"
                href={`/blog/${blog_url}/${data.slug}`}
                className=" text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 px-3 py-1 rounded"
              >
                ادامه مطلب
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewBlogBox;

import Image from "next/image";
import Link from "next/link";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";

const BlogBigBox = ({ data }) => {
  return (
    <article className=" relative w-[38rem] md:w-[40rem] h-[22.6rem] shadow-[0px_10px_10px_rgba(0,0,0,0.25)]  rounded-lg transition-all duration-500 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.35)]">
      <div className=" w-full  rounded-lg  h-[22.6rem]">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`/blog/${data.user}/${data.slug}`}
        >
          <div className=" relative w-full  rounded-lg  h-[22.6rem]">
            <Image
              src={data.image}
              sizes="50vw"
              alt={data.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </Link>
      </div>
      <div className="  rounded-lg absolute bottom-2 left-2 right-2 bg-[#ffffffdd] dark:bg-[#0000009f] flex flex-col gap-4 p-[.7rem]">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`/blog/${data.user}/${data.slug}`}
        >
          <h3 className=" line-clamp-1 transition-all duration-500 hover:text-blue-500">
            {data.title}
          </h3>
        </Link>
        <p className=" text-zinc-600 dark:text-zinc-200 line-clamp-2 text-base sm:text-sm bigBlogBoxStyle">
          {data.short_desc}
        </p>
      </div>
      <div className=" absolute top-4 left-2  text-base sm:text-sm">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`/blog/${data.user}/${data.slug}`}
          className=" text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 px-3 py-1 rounded"
        >
          ادامه مطلب
        </Link>
      </div>
      <div className=" absolute top-2 right-2 bg-white dark:bg-[#0000009f] p-1 rounded flex justify-end items-center gap-1 text-base sm:text-sm">
        <div className=" text-xs sm:text-base flex justify-start items-center gap-3">
          <div className=" flex justify-center items-center gap-2">
            <GoComment className=" w-5  h-5 text-blue-600" />
            <span>{data.commentsCount || 0}</span>
          </div>

          <div className=" flex justify-center items-center gap-1">
            <BiLike className=" w-5  h-5 text-blue-600" />
            <span>{data.likes_num}</span>{" "}
          </div>

          <div className=" flex justify-center items-center gap-1">
            <FiEye className=" w-5  h-5 text-blue-600" />
            <span>{data.view_num}</span>{" "}
          </div>

          <div className=" flex justify-center items-center gap-1">
            <FaRegClock className=" w-5  h-5 text-blue-600" />
            <span className="text-sm">{data.time} دقیقه</span>{" "}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogBigBox;

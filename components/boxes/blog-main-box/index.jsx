import Image from "next/image";
import Link from "next/link";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";



const BlogMainBox = ({ data }) => {
   return (
      <article className="sliderItem dark:bg-zinc-600 relative w-[17rem] min-w-[17rem] h-[22.6rem] flex flex-col gap-2 bg-white shadow-[0px_10px_10px_rgba(0,0,0,0.25)]  rounded-lg transition-all duration-500 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.35)]">
         <div className=" flex justify-center items-center  mt-[.5rem]">
            <Link  target="_blank" rel="noreferrer"  href={`/blog/${data.user}/${data.slug}`} className=" relative w-[16rem]  rounded-lg  h-[150px]">
               <Image sizes="256px" src={data.image} alt={data.title} fill className="object-cover rounded-md" />
            </Link>
         </div>
         <div className=" flex flex-col gap-4 p-[.5rem]">
            <Link target="_blank" rel="noreferrer"  href={`/blog/${data.user}/${data.slug}`} > <h3 className=" line-clamp-2  h-12  transition-all duration-500 hover:text-blue-500">{data.title}</h3></Link>
            <p className=" text-zinc-600 line-clamp-3 text-base sm:text-sm h-[63px] dark:text-zinc-200">{data.short_desc}</p>
            <div className=" flex justify-between items-center gap-1 mt-2  text-base sm:text-sm">
               <div className=" text-xs sm:text-base flex justify-start items-center gap-3">
                  <div className=" flex justify-center items-center gap-1"><GoComment className=" w-5  h-5 text-blue-600  text-base sm:text-xs" /><span> {data.commentsCount || 0}</span> </div>
                  <div className=" flex justify-center items-center gap-1"><BiLike className=" w-5  h-5 text-blue-600 text-base sm:text-xs" /><span  >{data.likes_num}</span> </div>
                  <div className=" flex justify-center items-center gap-1 bg-white dark:bg-[#000000ad] absolute top-3 right-3 p-1 rounded-md text-base sm:text-xs"><FiEye className=" w-5  h-5 text-blue-600" /><span  >{data.view_num}</span> </div>
                  <div className=" flex justify-center items-center gap-1 bg-white dark:bg-[#0000009f] absolute top-3 left-3 p-1 rounded-md  text-base sm:text-xs"><FaRegClock className=" w-5  h-5 text-blue-600" /><span >{data.time} دقیقه</span> </div>
               </div>
               <Link target="_blank" rel="noreferrer"  href={`/blog/${data.user}/${data.slug}`}  className=" text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 px-3 py-1 rounded">ادامه مطلب</Link>
            </div>
         </div>
      </article>
   );
}

export default BlogMainBox;
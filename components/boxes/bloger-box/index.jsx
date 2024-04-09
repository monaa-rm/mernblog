import Image from "next/image";
import Link from "next/link";


const BlogerBox = ({ data }) => {
   return (
      <div className=" flex justify-start items-center gap-2 h-[80px] w-[280px] rounded-lg hover:bg-white dark:bg-zinc-500 dark:hover:bg-zinc-600 transition-all duration-500 p-2">
         <Link target="_blank" rel="noreferrer"  className=" min-w-[80px] w-[80px] h-[80px] relative" href={`/blog/${data.username}`}><Image src={data.image} sizes="120px"  fill className=" object-cover rounded-full border-2 border-blue-500" alt={data.blog_name} /></Link>
         <div className=" flex flex-col gap-4 w-full">
            <Link target="_blank" rel="noreferrer" href={`/blog/${data.username}`}><h3 className=" line-clamp-1  transition-all duration-500 hover:text-blue-500">{data.blog_name}</h3></Link>
            <p className=" line-clamp-1 text-base sm:text-sm">{data.details}</p>
         </div>
      </div>
   );
}

export default BlogerBox;
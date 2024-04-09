"use client"
import BlogMainBox from "@/components/boxes/blog-main-box";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useRef } from "react";

const BlogOtherPosts = ({user_other_posts}) => {
    const carouselRef=useRef();
    const carouselSwitcher=(data)=>{
        if (carouselRef.current) {
            const width=carouselRef.current.offsetWidth;
            carouselRef.current.scrollTo(
                carouselRef.current.scrollLeft+width*data,0
            )
        }
    }

  
   return (
      <div className=" container mx-auto ">
         <section className="flex flex-col gap-4 px-2">
            <header className=" flex justify-between items-center">
               <h2 className=" title_style dark:text-white">
               مقالات دیگر این وبلاگ
               </h2>
               <div className=" flex items-center gap-1 text-zinc-800">
                  <FaChevronRight onClick={()=>{carouselSwitcher(1)}} className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-orange-400 w-10 h-10 p-2 rounded" />
                  <FaChevronLeft onClick={()=>{carouselSwitcher(-1)}} className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-orange-400 w-10 h-10 p-2 rounded" />
               </div>
            </header>
            <div ref={carouselRef} className="sliderContainer h-[24rem] w-full max-[50rem] overflow-x-scroll px-4  ">
               <div className=" flex justify-between items-center gap-8 ">
                  {
                     user_other_posts.map((da,i)=><BlogMainBox key={i} data={da} />)
                  }
                  
               </div>
            </div>
         </section>
      </div>
   );
};

export default BlogOtherPosts;

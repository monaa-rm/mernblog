import Image from "next/image";
import Link from "next/link";
import 'animate.css';

const SliderImage = ({data,animationHandler}) => {
   
   
   return (
      <div className={
         animationHandler==1?
         " animate__animated animate__fast animate__fadeIn relative w-full h-[400px] "
         :" animate__animated animate__fast animate__fadeOut relative w-full h-[400px] "
      }
      >
         <Image sizes="50vw" priority={true} src={data.image} alt={data.title} fill className="animate__animated animate__fast object-cover rounded-lg"/> 
         <Link target="_blank" rel="noreferrer" className="animate__animated animate__fast   line-clamp-1 leading-9 bg-white dark:bg-zinc-700 rounded p-2  dark:hover:text-blue-500 absolute bottom-2 right-2 left-2 h-12  transition-all duration-500 hover:text-blue-500" href={`/blog/${data.blog_slug}/${data.post_slug}`}><h2>{data.title}</h2></Link>
      </div>
   );
}

export default SliderImage;
import Link from "next/link";



const BreadCrumb = ({blog_link,blog_title,post_title}) => {
   return (
      <section className=" flex justify-start flex-wrap sm:flex-nowrap items-center gap-2">
         <Link target="_blank" rel="noreferrer" className="transition-all duration-500 hover:text-blue-500" href={"/"}>خانه</Link>
         <span>/</span>
         <Link target="_blank" rel="noreferrer" className="transition-all duration-500 hover:text-blue-500" href={`/blog/${blog_link}`}>{blog_title}</Link>
         <span>/</span>
         <span>{post_title}</span>
      </section>
   );
}

export default BreadCrumb;
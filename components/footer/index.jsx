
import Link from "next/link";
import GoToTop from "./go-to-top";

const Footer = () => {

   return (
      <footer className="p-4 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-2 mb-8 py-8">
         <ul className=" flex justify-center xl:justify-start items-center gap-6">
            <li>
               <Link href={"/about-us"} className=" transition-all duration-300 hover:text-blue-500">درباره ما</Link>
            </li>
            <li>
               <Link href={"/contact-us"} className=" transition-all duration-300 hover:text-blue-500">تماس با ما</Link>
            </li>
            <li>
               <Link href={"/search"} className=" transition-all duration-300 hover:text-blue-500">جستجو</Link>
            </li>
         </ul>
         <p>تمامی حقوق مادی و معنوی این سایت متعلق به مرن فا (mernfa.ir) می باشد و هرگونه کپی برداری، غیرقانونی محسوب خواهد شد.</p>
         <GoToTop />
      </footer>
   );
}

export default Footer;
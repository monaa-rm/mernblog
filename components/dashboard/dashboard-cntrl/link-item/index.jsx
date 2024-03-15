"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const DashboardLinkItem = ({ title, link }) => {
  const path = usePathname();
  return (
    <div
      className={
        link == path
          ? "w-[225px]  py-2 rounded-md text-center text-white transition-all  bg-blue-500  duration-300 hover:bg-blue-500 "
          : "w-[225px] py-2 rounded-md text-center text-black transition-all hover:text-white bg-zinc-200 duration-300 hover:bg-blue-500 "
      }
    >
      <Link href={link}>{title}</Link>
    </div>
  );
};

export default DashboardLinkItem;

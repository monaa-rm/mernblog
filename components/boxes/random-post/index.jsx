import Image from "next/image";
import Link from "next/link";

const RandomPostBox = ({ data }) => {
  return (
    <div className=" flex justify-start items-center gap-2 h-[82px] w-full rounded-lg hover:bg-white dark:hover:bg-zinc-700 transition-all duration-500 p-2">
      <Link
        target="_blank"
        rel="noreferrer"
        className=" min-w-[78px] w-[78px] h-[78px] relative"
        href={`/blog/${data.user}/${data.slug}`}
      >
        <Image
          src={data.image}
          sizes="80px"
          fill
          title={data.title}
          className=" object-cover rounded-md border-2 border-blue-500"
          alt={data.title}
        />
      </Link>
      <div className=" flex flex-col gap-4 w-full">
        <Link target="_blank" rel="noreferrer" href={data.slug}>
          <h3 className=" line-clamp-1  transition-all duration-500 hover:text-blue-500">
            {data.title}
          </h3>
        </Link>
        <p className=" line-clamp-1 text-base sm:text-sm">{data.short_desc}</p>
      </div>
    </div>
  );
};

export default RandomPostBox;

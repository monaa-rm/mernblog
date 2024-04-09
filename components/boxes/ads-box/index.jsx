import Link from "next/link";
import Image from "next/image";

const AdsBox = ({ goal_link, goal_alt, goal_img_link }) => {
  return (
    <Link target="_blank" rel="noreferrer" href={goal_link} className=" flex justify-center items-center">
      <div className="w-[140px] h-[140px] sm:w-[185px] sm:h-[185px]  relative ">
        <Image
          fill
          sizes="256px"
          className=" border-4 border-blue-500 transition-all duration-500 hover:border-orange-400  object-cover rounded-md"
          alt={goal_alt}
          src={goal_img_link}
        />
      </div>
    </Link>
  );
};

export default AdsBox;

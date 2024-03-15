import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import PostLinkCopy from "../post-link-copy";
import Bookmarker from "./bookmark";
import Liker from "./liker";

const PostMeta = ({ data, post_id }) => {
  return (
    <div className=" flex flex-col gap-4  w-[240px] min-w-[240px]">
      <div className=" flex  justify-between items-center gap-4 text-base sm:text-sm ">
        <div className=" flex justify-center items-center">
          <span>مطالعه :</span>
          <span>{data.study_time} دقیقه</span>
        </div>
        <div className=" flex justify-center items-center">
          {data.updatedAt}
        </div>
      </div>
      <div className=" flex justify-between items-center gap-2">
        <Link href={`https://telegram.me/${data.blog_link}/${data.slug}`}>
          <FaTelegramPlane className=" w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" />
        </Link>
        <Link href={`https://telegram.me/${data.blog_link}/${data.slug}`}>
          <BsTwitter className=" w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" />
        </Link>
        <PostLinkCopy
          url={`${process.env.SERVER_URL}/blog/${data.blog_link}/${data.slug}`}
        />
        <Liker post_id={post_id} show_num={false} />
        <Bookmarker post_id={post_id} />
      </div>
    </div>
  );
};

export default PostMeta;

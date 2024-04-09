import BreadCrumb from "@/components/post-page/bread-crumb";
import BlogerBox from "@/components/boxes/bloger-box";
import PostMeta from "@/components/post-page/post-meta";
import RandomPostBox from "@/components/boxes/random-post";
import BlogOtherPosts from "@/components/sliders/blog-other-posts";

import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import Bookmarker from "@/components/post-page/post-meta/bookmark";
import Liker from "@/components/post-page/post-meta/liker";
import CommentManager from "@/components/comment/comment-manager";
import { redirect } from "next/navigation";

const getData = async (inp, situation) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/get-one-post-by-slug/${inp.post_slug}?bl=${inp.blog_slug}&fulldata=${situation}`,
    { cache: "no-store" }
  );
  return data.json();
};
export async function generateMetadata({ params }) {
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const postData = await getData(params, false);
  if (!postData.data.post_slug) {
    return {
      title: "آدرس پست اشتباه است",
      description: "آدرس پست اشتباه است",
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  } else if (!postData.data.blog_slug) {
    return {
      title: "آدرس وبلاگ اشتباه است",
      description: "آدرس وبلاگ اشتباه است",
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  } else {
    return {
      title: `${postData.data.post_slug}`,
      description: postData.data.short_desc,
      alternates: {
        canonical: `${siteURL}/post/${params.post_slug}`,
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
      },
    };
  }
}

const SinglePostPage = async ({ params }) => {
  const { data: postData } = await getData(params, true);
  const { userData, random_posts, user_other_posts } = postData;
  if (!userData || !postData) {
    redirect("/not-found");
  }

  let metaDataCompData = {};
  if (postData.username) {
    metaDataCompData = {
      study_time: postData.study_time,
      updatedAt: postData.updatedAt,
      blog_link: userData.username,
      slug: postData.slug,
    };
  }

  return (
    <div className="mx-1">
      {postData.title == undefined ? (
        <div className="P-6">چنین پستی وجود ندارد</div>
      ) : (
        <div className="flex flex-col gap-12 ">
          <div className=" flex justify-between flex-wrap lg:flex-nowrap items-start gap-4">
            <main className=" flex flex-col gap-12 w-full">
              <div className=" flex flex-col gap-12 w-full bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <div className=" flex justify-between flex-wrap sm:flex-nowrap gap-4 sm:gap-1 items-center w-full">
                  <BreadCrumb
                    blog_link={userData.username}
                    blog_title={userData.blog_name}
                    post_title={postData.title}
                  />
                  <div className="flex justify-end gap-2 items-center">
                    <div className=" bg-white dark:text-black p-2 rounded-xl flex justify-end items-center gap-2">
                      <Liker post_id={postData._id} />
                    </div>
                    <div className=" bg-white dark:text-black p-2 rounded-xl flex justify-end items-center gap-2">
                      <span>{postData.view_num}</span>
                      <FaEye className=" cursor-pointer w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" />
                    </div>
                  </div>
                </div>

                <section className=" flex justify-between flex-wrap  md:flex-nowrap items-center gap-4">
                  <BlogerBox data={userData} />
                  <PostMeta data={metaDataCompData} post_id={postData._id} />
                </section>

                <section className=" flex flex-col gap-12  w-full">
                  <h1 className="title_style dark:text-white">{postData.title}</h1>
                  <p className=" text-justify leading-9 text-zinc-700 dark:text-zinc-100">
                    معرفی: {postData.short_desc}
                  </p>
                  <div className="  flex justify-center items-center">
                    <div className=" relative w-[280px] h-[200px]  sm:w-[500px] sm:h-[380px]  xl:w-[700px] xl:h-[500px]  ">
                      <Image
                        src={postData.image}
                        sizes="50vw"
                        fill
                        className=" rounded-lg object-cover"
                        alt={postData.title}
                        title={postData.title}
                      />
                    </div>
                  </div>
                  <p className=" text-justify leading-9 text-zinc-700 dark:text-zinc-100">
                    {postData.long_desc}
                  </p>
                  <div className="flex flex-col gap-3">
                    <h3>دسته بندی ها</h3>
                    <div className=" flex justify-start items-center gap-4 flex-wrap">
                      {postData.categories.map((da, i) => (
                        <Link
                          href={`/categories/${da.slug}`}
                          key={i}
                          className=" bg-zinc-200 dark:bg-zinc-700 rounded px-3 py-1 text-base sm:text-sm"
                        >
                          {da.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3>برچسب ها</h3>
                    <div className=" flex justify-start items-center gap-4 flex-wrap">
                      {postData.tags.map((da, i) => (
                        <Link
                          href={da}
                          key={i}
                          className=" bg-zinc-200 dark:bg-zinc-700 rounded px-3 text- py-1 text-base  max-w-full break-words sm:text-sm"
                        >
                          #{da}
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </main>
            <aside className=" sticky top-[5.8rem]  left-0 w-full lg:w-[360px] lg:min-w-[360px] flex flex-col gap-3">
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <BlogerBox data={userData} />
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex flex-col  gap-6">
                {random_posts.map((da, i) => (
                  <RandomPostBox key={i} data={da} />
                ))}
              </div>
            </aside>
          </div>

          <section className=" flex flex-col gap-12  w-full bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
            <BlogOtherPosts user_other_posts={user_other_posts} />
          </section>

          <section className=" flex flex-col gap-12  w-full bg-zinc-100 dark:bg-zinc-800  p-4 rounded-lg my-8">
            <h2 className="title_style dark:text-white">دیدگاه های این مقاله</h2>
            <CommentManager params={params} />
          </section>

          <div className=" fixed bottom-2 right-0 left-0 flex justify-center items-center ">
            <div className=" flex justify-center items-center gap-6  bg-[#ffffffcc] backdrop-blur-sm py-2 px-4 rounded-full">
              <Liker post_id={postData._id} show_num={false} />
              <Bookmarker post_id={postData._id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;

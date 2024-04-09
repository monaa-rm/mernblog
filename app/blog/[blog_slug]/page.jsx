import NewBlogBox from "@/components/boxes/new-blog-box";
import Image from "next/image";
import BlogFollowBtn from "@/components/blog-follow-btn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BlogMainBox from "@/components/boxes/blog-main-box";

const getFullData = async (inp, token, situation) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/get-one-blog-by-slug/${inp}?fulldata=${situation}`,
    {
      cache: "no-store",
      headers: {
        token: token,
      },
    }
  );
  return res.json();
};
export async function generateMetadata({ params: { blog_slug } }) {
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const cookieStore = cookies();
  const token = cookieStore.get("token")
    ? cookieStore.get("token").value
    : undefined;
  const userData = await getFullData(blog_slug, token, false);
  if (!userData.data) {
    return {
      title: "چنین کاربری وجود ندارد",
      description: "چنین کاربری وجود ندارد",
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  } else {
    return {
      title: `وبلاگ ${userData.data.blog_name}`,
      description: userData.data.details,
      alternates: {
        canonical: `${siteURL}/blog/${blog_slug}`,
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
      },
    };
  }
}

const SingleBlogPage = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")
    ? cookieStore.get("token").value
    : undefined;
  const userData = await getFullData(params.blog_slug, token, true);
  if (userData.data == "چنین کاربری وجود ندارد") {
    redirect("/not-found");
  }
  return (
    <div className=" flex flex-col gap-12">
      <section className=" flex flex-col gap-8 items-center">
        <div className="w-[150px] h-[150px] relative ">
          <Image
            sizes="150px"
            className=" rounded-full border-4 border-blue-500 object-cover"
            alt={userData.data.blog_name}
            fill
            src={userData.data.image}
          />
        </div>
        <h1 className="title_style dark:text-white">{userData.data.blog_name}</h1>
        <p className=" w-full sm:w-[600px] sm:max-w-[600px] text-center">
          {userData.data.details}
        </p>
        <div className=" flex justify-center items-center gap-8">
          <div> {userData.data.followers_number} دنبال کننده</div>
          <div>{userData.data.followings_number} دنبال شونده</div>
        </div>
        <BlogFollowBtn
          user_slug={params.blog_slug}
          btn_situation={userData.data.follow_button_situation}
        />
      </section>
      <section className=" hidden md:flex flex-col gap-4">
        {userData.data.posts.length > 0 &&
          userData.data.posts.map((da, i) => (
            <NewBlogBox key={i} data={da} blog_url={params.blog_slug} />
          ))}
      </section>
      <section className=" flex flex-wrap justify-around gap-4 md:hidden">
        {userData.data.posts.length > 0 &&
          userData.data.posts.map((da, i) => (
            <BlogMainBox key={i} data={da} blog_url={params.blog_slug} />
          ))}
      </section>
    </div>
  );
};

export default SingleBlogPage;

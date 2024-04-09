import BlogerBox from "../boxes/bloger-box";
import SkeletonManagement from "../main-page-popular-posts/skeleton/skeleton-management";

const getNewPostsData = async () => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/main-page/new-and-best-posts?new_posts=10`
  );
  return (await res).json();
};
const getTopBlogsData = async () => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/main-page/top-blogs`
  );
  return (await res).json();
};

const MainPageBestBlogsAndNewPosts = async () => {
  const new_posts = await getNewPostsData();
  const {users : blogersInfo} = await getTopBlogsData();
  const { posts } = new_posts;

  return (
    <section className="  bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 flex flex-col lg:flex-row  justify-between items-start gap-4">
      <div className=" flex flex-col gap-12 w-full lg:w-[280px] lg:min-w-[280px]">
        <h2 className=" title_style dark:text-white">برترین وبلاگ ها</h2>
        <div className=" flex flex-wrap gap-4">
          {blogersInfo && blogersInfo.map((da, i) => (
            <BlogerBox key={i} data={da} />
          ))}
        </div>
      </div>
      <div className=" flex flex-col gap-12 w-full">
        <h2 className=" title_style dark:text-white">جدیدترین ها</h2>
        {posts && posts.length == 0 ? null : <SkeletonManagement posts={posts} />}
        <div className=" flex flex-col gap-4"></div>
      </div>
    </section>
  );
};

export default MainPageBestBlogsAndNewPosts;

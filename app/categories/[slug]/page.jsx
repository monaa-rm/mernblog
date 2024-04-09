import BlogMainBox from "@/components/boxes/blog-main-box";
import { redirect } from "next/navigation";

const getCategoryData = async (inp, situation) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/${inp}?fulldata=${situation}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
};
export async function generateMetadata({ params: { slug } }) {
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const data = await getCategoryData(slug, false);
  if (!data.data) {
    return {
      title: "دسته بندی یافت نشد",
      description: "دسته بندی یافت نشد",
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  } else {
    return {
      title: `دسته ${data.data.title}`,
      description: "دسته بندی در سایت مرنبلاگ",
      alternates: {
        canonical: `${siteURL}/categories/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
      },
    };
  }
}

const SingleCategoryPage = async ({ params }) => {
  const data = await getCategoryData(params.slug, true);
  if (data.data == "دسته بندی یافت نشد") {
    redirect("/not-found");
  }
  return (
    <div className=" flex flex-col gap-12 mx-1">
      <h1 className="title-style">دسته بندی {data.goal_category.title}</h1>
      <section className="flex justify-around items-center gap-4 flex-wrap">
        {data.data.length == 0 ? (
          <div>هیچ پستی وجود ندارد</div>
        ) : data.data.length > 0 ? (
          data.data.map((item) => <BlogMainBox key={item._id} data={item} />)
        ) : null}
      </section>
    </div>
  );
};

export default SingleCategoryPage;

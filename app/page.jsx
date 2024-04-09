import MainSlider from "@/components/sliders/main-slider";
import MainPageCategories from "@/components/main-page-categories";
import MainPagePopularPosts from "@/components/main-page-popular-posts";
import MainPageAdsSection from "@/components/main-page-ads-section";
import MainPageBestBlogsAndNewPosts from "@/components/main-page-best-new-blogs";

const get_ads_data = async () => {
  const res = await fetch(
    `${process.env.SERVER_URL}/api/dashboard/main-page/ads`,
    { cache: "no-store" }
  );
  return res.json();
};

export async function generateMetadata() {
 const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;
  return {
    title: "سایت نکست جی اسی مرن بلاگ",
    description: "سایتی برای نوشتن پست هاتون",
    alternates: {
      canonical: `${siteURL}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}
const Home = async () => {
  const all_ads = await get_ads_data();
  return (
    <main className="m-1 flex flex-col gap-12  dark:bg-zinc-900">
      <MainSlider
        banners={all_ads.all_banners_ads}
        posts_ads={all_ads.all_posts_ads}
      />
      
      <MainPageCategories />
      <MainPagePopularPosts />
      <MainPageAdsSection banners={all_ads.all_banners_ads} />
      <MainPageBestBlogsAndNewPosts />
    </main>
  );
};

export default Home;

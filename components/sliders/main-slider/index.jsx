import SliderComp from "./slider-comp";
import MainSliderAds from "./ads";
import HotNews from "./hot-news";
const getChiefEditorsData = async () => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/main-page/chief-editor`
  );
  return (await res).json();
};
const MainSlider = async ({banners,posts_ads}) => {
  const chief_editors_data = await getChiefEditorsData();console.log(chief_editors_data)
  return (
    <section className=" bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 flex flex-col gap-6 ">
      <HotNews posts_ads={posts_ads}/>
      <div className=" flex flex-col lg:flex-row justify-between items-center gap-4 ">
        {chief_editors_data.data.length == 0 ? null : (
          <>
            <SliderComp postsData={chief_editors_data.data == 'خطا ' ? [] : chief_editors_data.data}/>
            <MainSliderAds banners={banners} />
          </>
        )}
      </div>
    </section>
  );
};

export default MainSlider;

import AdsBox from "@/components/boxes/ads-box";

const MainSliderAds = ({ banners }) => {
  return (
    <div className=" w-full lg:min-w-[185px] lg:w-[185px] h-[185px] lg:h-[400px]   flex  lg:flex-col  items-end justify-between gap-4">
      {banners && banners.length > 0 ? (
        <>
          {banners[banners.length - 1] ? (
            <AdsBox
              goal_link={banners[banners.length - 1].link}
              goal_alt={banners[banners.length - 1].image_alt}
              goal_img_link={banners[banners.length - 1].image}
            />
          ) : (
            <div className=" flex justify-center items-center w-[185px] h-[185px]  border-4 border-blue-500 transition-all duration-500 hover:border-orange-400  object-cover rounded-md">
              <div className="font-bold -rotate-45 text-3xl text-blue-600">
                محل تبلیغ
              </div>
            </div>
          )}
          {banners[banners.length - 2] ? (
            <AdsBox
              goal_link={banners[banners.length - 2].link}
              goal_alt={banners[banners.length - 2].image_alt}
              goal_img_link={banners[banners.length - 2].image}
            />
          ) : (
            <div className=" flex justify-center items-center w-[185px] h-[185px]  border-4 border-blue-500 transition-all duration-500 hover:border-orange-400  object-cover rounded-md">
              <div className="font-bold -rotate-45 text-3xl text-blue-600">
                محل تبلیغ
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className=" flex justify-center items-center w-[185px] h-[185px]  border-4 border-blue-500 transition-all duration-500 hover:border-orange-400  object-cover rounded-md">
            <div className="font-bold -rotate-45 text-3xl text-blue-600">
              محل تبلیغ
            </div>
          </div>
          <div className=" flex justify-center items-center w-[185px] h-[185px]  border-4 border-blue-500 transition-all duration-500 hover:border-orange-400  object-cover rounded-md">
            <div className="font-bold -rotate-45 text-3xl text-blue-600">
              محل تبلیغ
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainSliderAds;

import AdsBox from "../boxes/ads-box";

const MainPageAdsSection = ({ banners }) => {
  return (
    <section className=" flex flex-wrap justify-center lg:justify-between items-center gap-4 ">
      {banners && banners.map((banner, i) => (
        <AdsBox
          key={i}
          goal_link={banner.link}
          goal_alt={banner.image_alt}
          goal_img_link={banner.image}
        />
      ))}
    
    </section>
  );
};

export default MainPageAdsSection;

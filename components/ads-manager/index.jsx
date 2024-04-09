"use client";

import { useState } from "react";
import PostAds from "./post-ads";
import BannerAds from "./banner-ads";
import MyAds from "./my-ads";

const AdsManager = () => {
  const [ad_situation, setAd_situation] = useState("my-ads");
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setAd_situation("my-ads")}
          className={
            ad_situation == "my-ads"
              ? "bg-blue-500 text-white rounded-md px-4 py-3 hover:bg-blue-600 transition-all duration-300"
              : "bg-blue-300 text-white rounded-md px-4 py-3 hover:bg-blue-600 transition-all duration-300"
          }
        >
          تبلیغ های من
        </button>
        <button
          onClick={() => setAd_situation("post")}
          className={
            ad_situation == "post"
              ? "bg-blue-500 text-white rounded-md px-4 py-3 hover:bg-blue-600 transition-all duration-300"
              : "bg-blue-300 text-white rounded-md px-4 py-3 hover:bg-blue-600 transition-all duration-300"
          }
        >
          تبلیغ پست
        </button>
        <button
          onClick={() => setAd_situation("banner")}
          className={
            ad_situation == "banner"
              ? "bg-blue-500 text-white rounded-md px-4 py-3 hover:bg-blue-600 transition-all duration-300"
              : "bg-blue-300 text-white rounded-md px-4 py-3 hover:bg-blue-600 transition-all duration-300"
          }
        >
          تبلیغ بنری
        </button>
      </div>
      {ad_situation == "my-ads" ? (
        <MyAds setAd_situation={setAd_situation} />
      ) : ad_situation == "post" ? (
        <PostAds setAd_situation={setAd_situation} />
      ) : (
        <BannerAds setAd_situation={setAd_situation} />
      )}
    </div>
  );
};

export default AdsManager;

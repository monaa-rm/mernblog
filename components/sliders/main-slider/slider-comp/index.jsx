"use client";

import SliderBtn from "../button";
import SliderImage from "../slider-image";

import { useState } from "react";

const SliderComp = ({ postsData }) => {
  const [activeSlide, setactiveSlide] = useState(postsData[0]);
  const [animationHandler, setanimationHandler] = useState(1);
  console.log(postsData.length);
  return (
    <div className=" relative flex justify-start gap-4 items-center w-full h-[400px]">
      <div className=" hidden md:flex flex-col justify-between  h-[400px]">
        {postsData.length &&
          postsData.map((da, i) => (
            <SliderBtn
              key={i}
              setanimationHandler={setanimationHandler}
              da={da}
              text={da.title}
              setactiveSlide={setactiveSlide}
              activeSlide={activeSlide}
            />
          ))}
      </div>
      <div className=" w-full flex justify-center items-center  bg-zinc-200 rounded-lg ">
        {postsData.length && (
          <SliderImage data={activeSlide} animationHandler={animationHandler} />
        )}
      </div>
      <div className=" absolute top-0 bottom-0  flex items-center left-4  ">
        <div className=" flex flex-col gap-2">
          {postsData.length &&
            postsData.map((da, i) => (
              <div
                key={i}
                onClick={() => {
                  if (activeSlide.number != da.number) {
                    setanimationHandler(0);
                    setTimeout(() => {
                      setactiveSlide(da);
                      setanimationHandler(1);
                    }, 500);
                  }
                }}
                className={
                  activeSlide.number == da.number
                    ? " bg-blue-500 border-2 border-blue-500 rounded-full h-5 w-5 cursor-pointer"
                    : " bg-white border-2 border-blue-500 rounded-full h-5 w-5 cursor-pointer"
                }
              ></div>
            ))}
        </div>
      </div>
      <div className=" text-sm  border-2 border-blue-500 text-blue-500 bg-white rounded p-1 z-40 absolute top-2 left-2">
        پیشنهاد سردبیر
      </div>
    </div>
  );
};

export default SliderComp;

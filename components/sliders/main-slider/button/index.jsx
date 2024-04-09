"use client"

const SliderBtn = ({ setanimationHandler, da, text, setactiveSlide,activeSlide }) => {




   return (
      <div onClick={() => {
         if (activeSlide.number != da.number) {
            setanimationHandler(0);
            setTimeout(() => {
               setactiveSlide(da);
               setanimationHandler(1);
            }, 800);
         }
      }} 
      className={
         activeSlide.number == da.number
         ?" cursor-pointer line-clamp-1 rounded-md hover:bg-blue-600 bg-blue-500 transition-all duration-500 text-white w-[300px] h-[58px] px-2 flex justify-center items-center"
         :" cursor-pointer line-clamp-1 rounded-md hover:bg-blue-600 bg-blue-400 transition-all duration-500 text-white w-[300px] h-[58px] px-2 flex justify-center items-center"
      }>
         <div className=" line-clamp-1">{text}</div>
      </div>
   );
}

export default SliderBtn;
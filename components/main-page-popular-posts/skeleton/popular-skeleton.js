const PopularSkeleton = () => {
  return (
    <div className=" sm:flex-wrap flex flex-col sm:flex-row justify-center items-center gap-4">
      <div className=" w-[40rem] h-[22.6rem] hidden sm:flex  rounded-lg skeleton_description"></div>
      <div className="w-[17rem] min-w-[17rem] flex sm:hidden h-[22.6rem] rounded-lg skeleton_description"></div>
      <div className="flex justify-between items-center gap-4">
        <div className="w-[17rem] min-w-[17rem] h-[22.6rem] rounded-lg skeleton_description"></div>
        <div className="w-[17rem] min-w-[17rem] h-[22.6rem] rounded-lg skeleton_description"></div>
      </div>
    </div>
  );
};

export default PopularSkeleton;

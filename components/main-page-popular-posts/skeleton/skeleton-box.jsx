function SkeletonBox() {
  return (
    <div className="flex  items-center justify-center">
      <article className="  w-full h-[19rem] md:h-[16.5rem]">
        <div className=" w-full   flex justify-start items-start gap-4">
          <div className="  w-[15rem] md:w-[20rem]  rounded-lg skeleton_description h-[18rem] md:h-[15rem]"></div>

          <div className=" hidden h-[15rem] w-full md:flex flex-col gap-2 justify-between  p-[.5rem]">
            <div className="flex flex-col gap-12">
              <div>
                <h3 className=" w-full  rounded-lg skeleton_description h-12"></h3>
              </div>
              <p className=" skeleton_description  rounded-lg w-full h-12"></p>
            </div>
            <div className="  rounded-lg skeleton_description  h-12 w-full "></div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default SkeletonBox;

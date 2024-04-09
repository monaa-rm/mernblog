"use client";

const TopButton = ({
  buttonContent,
  setButtonContent,
  setPosts,
  content,
  title,
}) => {
  return (
    <button
      onClick={() => {
        setButtonContent(content);
        setPosts(-1);
      }}
      className={
        buttonContent == content
          ? " px-1 py-[1px] flex  sm:px-3 sm:py-[2px] rounded border-2 text-base sm:text-sm bg-blue-600 dark:hover:bg-zinc-700 hover:bg-white text-white hover:text-blue-500 border-blue-500 transition-all duration-500 "
          : " px-1 py-[1px] flex sm:px-3 sm:py-[2px] rounded border-2 text-base sm:text-sm bg-white dark:bg-zinc-700 border-blue-500  dark:hover:text-blue-500 transition-all duration-500 hover:bg-blue-600"
      }
    >
      {title}
    </button>
  );
};

export default TopButton;

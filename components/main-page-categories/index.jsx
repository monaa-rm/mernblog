import CategoryBox from "./category-box";

const getData = async () => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/category/all?paginate=1000&page_number=1`
  );
  return (await res).json();
};
const MainPageCategories = async () => {
  const cats = await getData();
  const categories = cats.categories;
  return (
    <section className="  bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 flex flex-col gap-8">
      <h2 className=" title_style dark:text-white">
        طبق دسته بندی های مرن بلاگ انتخاب کنید...
      </h2>
      <div className="flex justify-around items-center flex-wrap gap-6">
        {categories &&
          (categories.length == 0
            ? null
            : categories.map((da, i) => <CategoryBox key={i} data={da} />))}
      </div>
    </section>
  );
};

export default MainPageCategories;

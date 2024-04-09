import DahsboardManager from "@/components/dashboard/dahsboard-manager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata({ params: { slug } }) {
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;

  let title = "";
  switch (slug[0]) {
    case "default":
      title = "پیشخوان";
      break;
    case "users":
      title = "کاربران";
      break;
    case "posts":
      title = "پست ها";
      break;
    case "ads":
      title = "تبلیغات";
      break;
    case "comments":
      title = "دیدگاه ها";
      break;
    case "categories":
      title = "دسته بندی";
      break;
    case "not-accepted":
      title = "پست های در انتظار تایید";
      break;
    case "notifications":
      title = "نوتیفیکیشن ها";
      break;
    case "chief-editor":
      title = "پیشنهاد سردبیر";
      break;

    default:
      title = "مدیریت سایت";
  }

  return {
    title,
    description: "مدیریت سایت",
    alternates: {
      canonical: `${siteURL}/dashboard/${slug}`,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

const getData = async (token) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/token-to-user`, {
    cache: "no-store",
    headers: {
      token: token,
    },
  });

  const outData = await data.json();
  if (outData.data.role != 1 && outData.data.role != 2) {
    redirect("/");
  } else {
    return outData;
  }
};

const DahsboardSlugPage = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")
    ? cookieStore.get("token").value
    : undefined;
  const data = await getData(token);
  return <DahsboardManager params={params} role={data.data.role} />;
};

export default DahsboardSlugPage;

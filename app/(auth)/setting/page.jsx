import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import UpdateUserData from "@/components/setting-page-comps/update-user-data";

const getData = async (token) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/token-to-user`, {
    cache: "no-store",
    headers: {
      token: token,
    },
  });

  const outData = await data.json();
  if (outData.data.loged == false) {
    redirect("/sign-in");
  } else {
    return outData;
  }
};
export async function generateMetadata() {
  const siteURL = process.env.SERVER_URL;
  return {
    title: "تنظیمات",
    description: "تنظیمات",
    alternates: {
      canonical: `${siteURL}/setting`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

const Setting = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")
    ? cookieStore.get("token").value
    : undefined;
  await getData(token);

  return (
    <div className="mx-1">
      <UpdateUserData token={token} />
    </div>
  );
};

export default Setting;

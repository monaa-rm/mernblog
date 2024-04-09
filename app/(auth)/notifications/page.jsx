import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import NotifsComp from "@/components/notifs";

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
    title:"نوتیفیکیشن های من",
    description: "نوتیفیکیشن های من",
    alternates: {
      canonical: `${siteURL}/notifications`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}
const Notifications = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")
    ? cookieStore.get("token").value
    : undefined;
  await getData(token);

  return (
    <div>
      <NotifsComp token={token} />
    </div>
  );
};

export default Notifications;

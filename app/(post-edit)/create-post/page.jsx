import NewPost from "@/components/create-post";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;

  return {
    title: "ایجاد پست",
    description:  "ایجاد پست",
    alternates: {
      canonical: `${siteURL}/create-post`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}
const CreatePost = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")
    ? cookieStore.get("token").value
    : undefined;
  await getData(token);

  return <div>
    <NewPost />
  </div>;
};

export default CreatePost;

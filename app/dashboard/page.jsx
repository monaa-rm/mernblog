import { redirect } from "next/navigation";

export async function generateMetadata() {
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;

  return {
    title: "مدیریت سایت",
    description: "مدیریت سایت",
    alternates: {
      canonical: `${siteURL}/dashboard`,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

const Dashb = () => {
  redirect("/dashboard/default");
  return <div></div>;
};

export default Dashb;

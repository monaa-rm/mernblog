import { redirect } from "next/navigation";

export async function generateMetadata() {
  const siteURL = `http://localhost:3000`;
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

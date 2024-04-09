import SignInComponent from "@/components/auth-components/sign-in-form";
import { cookies } from "next/headers";
import Link from "next/link";

const getData=async(token)=>{
   const data=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/token-to-user`,{cache:"no-store",headers:{
      token:token
   }});
   const outData=await data.json();
   if(outData.data.loged==true){
   }else{
      return outData
   }
}
export async function generateMetadata() {
   const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;

   return {
     title:"ورود به سایت",
     description: "ورود به سایت",
     alternates: {
       canonical: `${siteURL}/sign-in`,
     },
     robots: {
       index: true,
       follow: true,
       nocache: true,
     },
   };
 }


const SignInPage = async () => {
   const cookieStore=cookies();
   const token=cookieStore.get("token")?cookieStore.get("token").value:undefined;
   const data=await getData(token);


   return (
      <div className=" flex justify-center items-center">
         <div className=" flex flex-col gap-8 p-4 rounded-lg bg-zinc-100 ">
            <div className=" flex justify-between items-center">
               <h1 className="title_style">ورود به حساب کاربری</h1>
               <Link href={"/sign-up"} className=" bg-zinc-200 dark:text-black px-3 py-1 rounded-md hover:text-blue-500 transition-all duration-500">ثبت نام</Link>
            </div>
            <SignInComponent />

         </div>
      </div>
   );
}

export default SignInPage;
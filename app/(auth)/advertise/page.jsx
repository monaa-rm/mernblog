import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdsManager from "@/components/ads-manager";

const getData=async(token)=>{
   const data=await fetch(`${process.env.SERVER_URL}/api/user/token-to-user`,{cache:"no-store",headers:{
      token:token
   }});
   
   const outData=await data.json();
   if(outData.data.loged==false){
      redirect("/sign-in")
   }else{
      return outData
   }
}


const Ads = async () => {

   const cookieStore=cookies();
   const token=cookieStore.get("token")?cookieStore.get("token").value:undefined;
   await getData(token);


   return (
      <div className="mx-1  dark:bg-zinc-900">
         <AdsManager token={token}/>
      </div>
   );
}

export default Ads;
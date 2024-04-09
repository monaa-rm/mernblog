import Image from "next/image";

export async function generateMetadata() {
   return {
     title:"لطفا صبر کنید",
     description:"لطفا صبر کنید",

     robots: {
       index: false,
       follow: false,
       nocache: true,
     },
   };
 }


const Loading = () => {
   return (
      <div className=" my-12 flex justify-center items-center">
         <Image width={120} height={120} alt="loding" src={"/loading.svg"}/>
      </div>
   );
}

export default Loading;
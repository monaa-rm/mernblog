"use client"

export async function generateMetadata() {
   return {
     title:"خطا",
     description:"خطا",

     robots: {
       index: false,
       follow: false,
       nocache: true,
     },
   };
 }

const Error = () => {
   return (
      <div className=" my-12 flex justify-center items-center">
         خطا 
      </div>
   );
}

export default Error;
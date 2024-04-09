
export async function generateMetadata() {

   return {
     title:"صفحه یافت نشد",
     description: "صفحه یافت نشد",

     robots: {
       index: false,
       follow: false,
       nocache: true,
     },
   };
 }

const NotFound = () => {
   return (
      <div className=" my-12 flex justify-center items-center">
         صفحه یافت نشد...
      </div>
   );
}

export default NotFound;
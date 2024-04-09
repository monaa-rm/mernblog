
export async function generateMetadata() {
  const siteURL = process.env.NEXT_PUBLIC_SERVER_URL;
 
   return {
     title:"تماس با ما",
     description: "تماس با ما",
     alternates: {
       canonical: `${siteURL}/contact-us`,
     },
     robots: {
       index: true,
       follow: true,
       nocache: true,
     },
   };
 }
 
const ContactUs = () => {
   return (
      <div className=" my-12 flex justify-center items-center">
         تماس با ما
      </div>
   );
}

export default ContactUs;
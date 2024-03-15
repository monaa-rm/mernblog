
export async function generateMetadata({ params: { slug } }) {
   const siteURL = `http://localhost:3000`;
 
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
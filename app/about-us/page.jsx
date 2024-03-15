export async function generateMetadata({ params: { slug } }) {
   const siteURL = `http://localhost:3000`;
 
   return {
     title:"درباره ما",
     description: "درباره ما",
     alternates: {
       canonical: `${siteURL}/about-us`,
     },
     robots: {
       index: true,
       follow: true,
       nocache: true,
     },
   };
 }
 
const AboutUs = () => {
   return (
      <div className=" my-12 flex justify-center items-center">
         درباره ما
      </div>
   );
}

export default AboutUs;
import "../styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";


// PROVIDERS
import SplashScreenProvider from "./providers/splash-screen-provider";
import ReduxToolkitProvider from "./providers/redux_toolkit-provider";
import ToastProvider from "./providers/toast-provider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userscalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-zinc-900 dark:text-white ">
      
        <ReduxToolkitProvider>
          <SplashScreenProvider>
          <ToastProvider>
            <div className=" flex flex-col gap-12  dark:bg-zinc-900 dark:text-white ">
              <>
                <meta charSet="utf-8" />
                <link
                  rel="shortcut icon"
                  href="/images/favicon.ico"
                  type="image/x-icon"
                />
              </> 
              <Header />
              <div className=" container mx-auto flex flex-col gap-12">
                {children}
             <Footer />
              </div>
            </div>
          </ToastProvider>
          </SplashScreenProvider>
        </ReduxToolkitProvider>
      </body>
    </html>
  );
}

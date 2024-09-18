"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/common/Loader";
import Router from 'next/router';


if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      setLoading(true);
    };
    const handleComplete = (url) => {
      console.log(`Completed: ${url}`);
      setLoading(false);
    };

    // Subscribe to Next.js Router events
    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    // Cleanup event listeners on component unmount
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);


  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="keywords"
          content="	candidates, career, employment, indeed, job board, job listing, job portal, job postings, job search, job seeker, jobs, recruiters, recruiting, recruitment, resume"
        />
        <meta
          name="description"
          content="Superio - Job Borad React NextJS Template"
        />
        <meta name="ibthemes" content="ATFN" />

        <link rel="icon" href="./favicon.ico" />
      </head>

      <body>
        <Provider store={store}>
          <div className="page-wrapper">
          {loading && <Loader />} {/* Show loader when loading is true */}

            {children}

            {/* Toastify */}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {/* <!-- Scroll To Top --> */}
            <ScrollToTop />
          </div>
        </Provider>
      </body>
    </html>
  );
}

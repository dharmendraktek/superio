// // pages/_app.js
// import '../styles/index.scss';  // Import global styles

// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }


// pages/_app.js
import { useState, useEffect } from 'react';
import Router from 'next/router';
// import '../styles/globals.css';  // Your global CSS
import '../styles/index.scss';  // Import global styles
import Loader from '@/components/common/Loader';


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const handleRouteChangeStart = () => setLoading(true);
    // const handleRouteChangeComplete = () => setLoading(false);

    // Handle route change events
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      {loading && <Loader />} {/* Show loader when route is changing */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

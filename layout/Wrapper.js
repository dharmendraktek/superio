// const Wrapper = ({ children }) => {
//   return <>{children}</>;
// };

// export default Wrapper;

'use client'
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Loader from '@/components/common/Loader';

const Wrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    console.log("---------this is working wrapper")
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
      {loading && <Loader />}
      {children}
    </>
  );
};

export default Wrapper;

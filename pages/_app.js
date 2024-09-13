// pages/_app.js
import '../styles/index.scss';  // Import global styles
import '../styles/test.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// pages/_app.js
import '../styles/index.scss';  // Import global styles

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

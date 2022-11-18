import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#ffffff" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

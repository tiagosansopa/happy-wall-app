import Head from "next/head";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <main>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Happy Wall</title>
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
export default MyApp;

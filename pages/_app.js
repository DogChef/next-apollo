import App from "next/app";
import Head from "next/head";
import { withApollo } from "../lib/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default withApollo(MyApp);

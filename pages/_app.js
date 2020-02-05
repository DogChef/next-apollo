import App from "next/app";
import Head from "next/head";
import { withApollo } from "../lib/apollo";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./_theme";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }) {
  if (Cookies.get("signedin")) {
    navigate("/home");
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default withApollo(MyApp);

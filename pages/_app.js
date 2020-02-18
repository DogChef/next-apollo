import App from "next/app";
import Head from "next/head";
import { withApollo } from "../lib/apollo";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./_theme";
import Cookies from "js-cookie";

const MyApp = ({ Component, pageProps }) => {
  if (Cookies.get("signedin")) {
    navigate("/users");
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.syncfusion.com/ej2/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-richtexteditor/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-buttons/styles/material.css"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default withApollo(MyApp);

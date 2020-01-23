import App from 'next/app';
import { withApollo } from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default withApollo(MyApp);
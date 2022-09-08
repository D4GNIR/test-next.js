// Librairie
import "../styles/default.css";
import Head from "next/head";
import { Provider } from "next-auth/client";

// Composant
import Layout from "../components/UI/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Dagnir</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

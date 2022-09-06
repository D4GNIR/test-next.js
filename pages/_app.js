// Librairie
import "../styles/default.css";
import Head from "next/head";

// Composant
import Layout from "../components/UI/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Dagnir</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

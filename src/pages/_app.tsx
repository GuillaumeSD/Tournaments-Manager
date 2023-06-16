import Layout from "../components/layout";
import { TournamentProvider } from "../contexts/tournamentContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppProps } from "next/app";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tournament Manager</title>
      </Head>
      <TournamentProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TournamentProvider>
    </>
  );
}

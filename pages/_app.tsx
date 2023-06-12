import Layout from "@/components/layout/layout";
import { TournamentProvider } from "@/contexts/tournamentContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TournamentProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TournamentProvider>
  );
}

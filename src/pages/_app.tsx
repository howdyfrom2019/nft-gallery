import WagmiProvider from "@/features/wallet/WagmiProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Onboarding</title>
      </Head>
      <WagmiProvider>
        <Toaster />
        <Component {...pageProps} />
      </WagmiProvider>
    </>
  );
}

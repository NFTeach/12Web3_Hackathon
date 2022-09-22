import { useEffect } from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useMoralis } from "react-moralis";

const Moralis = require("moralis-v1/node");

const servUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const masterKey = process.env.NEXT_PUBLIC_MORALIS_MASTER_KEY;

await Moralis.start({ serverUrl: servUrl, appId: appId, masterKey: masterKey });

export default function Home() {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NFTeach - Home</title>
        <meta name="description" content="NFTeach - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}

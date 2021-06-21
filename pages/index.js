import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [language, setLanguage] = useState({});

  return (
    <div className={styles.container}>
      <Head>
        <title>Google Translator</title>
        <meta
          name="description"
          content="This is a development practice challenge for topcoder by Alvin B. Almodal"
        />
      </Head>

      <main className={styles.main}>H1 Test</main>
    </div>
  );
}

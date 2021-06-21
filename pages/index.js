import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Google Translator</title>
        <meta
          name="description"
          content="GThis is a development practice challenge for topcoder by Alvin B. Almodal"
        />
      </Head>

      <main className={styles.main}>H1 Test</main>
    </div>
  );
}

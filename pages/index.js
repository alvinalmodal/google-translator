import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { createDataList } from "../services/supportLanguages";

export default function Home() {
  const [sourceLang, setSourceLang] = useState("tl");
  const [targetLang, setTargetLang] = useState("en");
  const [query, setQuery] = useState("");
  const [translatedQuery, setTranslatedQuery] = useState("");

  const translate = async () => {
    console.log(
      sourceLang,
      targetLang,
      query,
      `/api/translate?sourceLang=${sourceLang}&targetLang=${targetLang}&query=${query}`
    );
    const res = await fetch(
      `/api/translate?sourceLang=${sourceLang}&targetLang=${targetLang}&query=${query}`
    );
    const data = await res.json();
    mapAPIResponse(data);
  };

  const mapAPIResponse = ({ sentences }) => {
    if (sentences) {
      let translation = sentences.map((sentence) => sentence.trans).join("");
      setTranslatedQuery(translation);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Google Translator</title>
        <meta
          name="description"
          content="This is a development practice challenge for topcoder by Alvin B. Almodal"
        />
      </Head>
      <h1 className={styles.header}>Google Translator</h1>
      <main className={styles.main}>
        <input
          list="supported-languages"
          name="sourceLang"
          id="sourceLang"
          onChange={(e) => setSourceLang(e.target.value)}
        />
        <input
          list="supported-languages"
          name="targetLang"
          id="targetLang"
          onChange={(e) => setTargetLang(e.target.value)}
        />
        <textarea
          id="sl"
          rows="4"
          cols="50"
          placeholder="Please enter words to be translated..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        ></textarea>
        <textarea
          id="tl"
          rows="4"
          cols="50"
          disabled
          className={styles.translated}
          value={translatedQuery}
        ></textarea>
        <button onClick={translate}>Translate</button>
      </main>
      {createDataList()}
    </div>
  );
}

import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='../static/images/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>How we make it ﹣ grds</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

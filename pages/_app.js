import React from 'react';
import Head from 'next/head';
import '../static/css/global.css';
import '../static/css/animation.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='../static/images/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0'
        />
        <title>How we make it ﹣ grds</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

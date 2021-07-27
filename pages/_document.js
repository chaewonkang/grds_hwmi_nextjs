import React, { Component, createRef } from 'react';
import Router from 'next/router';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import store from '../common/store';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import jQuery from 'jquery';

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='description' content='How we make it ﹣ grds' />
          <meta property='og:title' content={`How we make it ﹣ grds`} />
          <script src='//developers.kakao.com/sdk/js/kakao.js'></script>
          {/* GLOBAL/COMPONENT CSS IMPORT. */}
          {/* <link rel="stylesheet" type="text/css" href="/static/css/font.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/page-global.module.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/comp-header.module.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/comp-header-dropdown.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/comp-header-subheader.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/comp-header-subheader-dropdown.css" /> */}
          {/*  */}
          {/* GLOBAL CARD */}
          {/* <link rel="stylesheet" type="text/css" href="/static/css/comp-card-profile1.css" /> */}
          {/* <link rel="stylesheet" type="text/css" href="/static/css/comp-card-empty1.css" /> */}
        </Head>
        <body>
          {/* Header on Each files */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

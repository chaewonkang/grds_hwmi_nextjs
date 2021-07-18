import Head from 'next/head';
import React, { Component, createRef } from 'react';
import { observable, toJS, reaction } from 'mobx';
import { observer } from 'mobx-react';
import Router from 'next/router';
import jQuery from 'jquery';
import parse from 'html-react-parser';
import moment from 'moment';
import { Footer, Header, GoToTop } from '../components';

import * as Wine from '../axios/Material';
// import Header from "../components/Header";
import store from '../common/store';

@observer
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
    };
    // this.headerRef = createRef();
    this.onResize = this.onResize.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    store.layoutMode = this.getLayoutMode();
  }

  getLayoutMode() {
    return window.innerWidth > 992
      ? 'desktop'
      : window.innerWidth > 600
      ? 'tablet'
      : 'mobile';
  }

  componentDidMount() {
    window.$ = window.jQuery = jQuery;
    window.addEventListener('resize', this.onResize);
    store.layoutMode = this.getLayoutMode();
    this.____getPageData();
  }

  componentDidUpdate() {}

  ____getPageData = () => {
    // this.___apiGetItem();
    setTimeout(() => {
      this.setState((state) => ({ pageLoaded: true }));
    }, 1500);
  };

  ___apiGetItem = () => {
    const req = { query: '' };
    Wine.getList(req)
      .then((res) => {
        if (res.status < 300) {
          this.setState({
            pageData0: res.data.results,
          });
        } else {
        }
      })
      .then(() => {})
      .catch((e) => {});
  };

  render() {
    return (
      <>
        {/* PAGE'S STATIC RESOURCE IMPORT. */}
        <Head>
          {/* LOADER */}
          {/* PAGE CSS */}
          {/* PAGE CARD */}
          <link
            rel='stylesheet'
            type='text/css'
            href='/static/css/common-loader.css'
          />
          <link rel='stylesheet' type='text/css' href='/static/css/font.css' />
          <link
            rel='stylesheet'
            type='text/css'
            href='/static/css/page-index.css'
          />
        </Head>
        {/* <Header  path={'/'} ref={(ref)=>{this.headerRef = ref}}></Header> */}
        {/* <HeaderSub  path={'/'} ref="header_sub" menu={main_page_menu}></HeaderSub> */}
        {this.state.pageLoaded == true ? (
          <>
            <Header></Header>
            <Footer></Footer>
            <GoToTop scrollStepInPx='100' delayInMs='30.50'></GoToTop>
          </>
        ) : (
          <>{/* <div id="loader"></div> */}</>
        )}
      </>
    );
  }
}

export default Index;

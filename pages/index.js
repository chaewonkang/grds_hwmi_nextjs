import Head from 'next/head';
import React, { Component, createRef } from 'react';
import { observable, toJS, reaction } from 'mobx';
import { observer } from 'mobx-react';
import Router from 'next/router';
import jQuery from 'jquery';
import parse from 'html-react-parser';
import moment from 'moment';
import { Footer, Header, GoToTop, GoToShop, ProductBody } from '../components';

import store from '../common/store';
import Link from 'next/link';

import styled from 'styled-components';
const imagePath07 = [
  '../static/images/introduction/int_1.png',
  '../static/images/introduction/int_2.png',
  '../static/images/introduction/int_3.jpeg',
  '../static/images/introduction/int_4.jpeg',
  '../static/images/introduction/int_5.jpeg',
];

const StyledBurger = styled.button`
  position: absolute;
  right: 2em;
  background-color: rgba(0, 0, 0, 0) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1rem;
  height: 1rem;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 100;

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    display: none;
  }

  div {
    width: 1.8rem;
    background-color: #000;

    height: 0.05rem;
    border-radius: 0px;
    transition: all 0.3s linear;

    transform-origin: center;

    :first-child {
      transform: ${({ open }) =>
        open ? 'rotate(30deg) translateY(6px)' : 'rotate(0)'};
    }

    :nth-child(2) {
      width: 1.3rem;
      transform: ${({ open }) => (open ? 'translateX(100px) ' : 'rotate(0)')};
    }

    :last-child {
      transform: ${({ open }) =>
        open ? 'rotate(-30deg) translateY(-6px)' : 'rotate(0)'};
    }
  }
`;

const StyledMenu = styled.nav`
  display: ${({ open }) => (open ? 'block' : 'none')};
  width: 100vw;
  padding-top: 0px;
  padding-bottom: 0;
  z-index: 100;
  border-bottom: 1px solid #888;
  height: 45vh;
  background-color: #f4f1de;
  position: sticky;
  top: 41px;
  transition: height 1.5s;
  transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);

  & > div {
    animation: fade-in 0.3s ease-in-out;
    display: grid;
    grid-template-rows: 40px 1fr;
    height: 100%;
  }

  & > div > div:nth-child(1) {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #888;
    border-top: 1px solid #888;
    padding-left: 1em;
  }

  & > div > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    height: 100%;

    & > div {
      width: 50%;
      border-right: 1px solid #888;

      &:first-child {
        padding-left: 1em;
        padding-top: 1em;
      }
    }

    & > div:nth-child(2) {
      display: flex;
      flex-direction: column;

      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50%;

        :last-child {
          border-top: 1px solid #888;

          img {
            width: 50%;
          }
        }
      }
    }
  }

  & > div > span {
    display: block;
    vertical-align: middle;
  }

  & > div > a {
    display: block;
    padding: 0.25em;
    margin-top: 0.5em;

    color: #fff;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: em;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

const StyledNav = styled.div`
  padding-top: 1.5em;
  padding-left: 1em;

  li {
    margin-bottom: 0.25em;
  }
`;

@observer
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      open: false,
    };
    // this.headerRef = createRef();
    this.onResize = this.onResize.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    // store.layoutMode = this.getLayoutMode();
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
    // store.layoutMode = this.getLayoutMode();
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
            <div>
              <Link href='/category/introduction'>
                <div>Hello World</div>
              </Link>

              <div></div>
            </div>
          </>
        ) : (
          <>{/* <div id="loader"></div> */}</>
        )}
      </>
    );
  }
}

export default Index;

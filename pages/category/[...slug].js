import Head from 'next/head';
import React, {
  Component,
  createRef,
  useState,
  useEffect,
  useRef,
} from 'react';

import { useRouter } from 'next/router';

import {
  Footer,
  GoToTop,
  Traceability,
  Product,
  Material,
} from '../../components';

import Link from 'next/link';
import LogoBlack from '../../static/images/LogoBlack.png';

import { SearchBar } from '../../components';

import styled from 'styled-components';

const imagePath07 = [
  '../static/images/introduction/int_1.png',
  '../static/images/introduction/int_2.png',
  '../static/images/introduction/int_3.jpeg',
  '../static/images/introduction/int_4.jpeg',
  '../static/images/introduction/int_5.jpeg',
];

const materialPath = [
  '../static/images/material/1_1.jpg',
  '../static/images/material/1_2.jpeg',
  '../static/images/material/1_3.jpg',
];

const StyledBurger = styled.div`
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
  z-index: 10000000;

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

const Header = () => {
  const [pos, setPos] = useState(false);

  const [query, setQuery] = useState('');

  const timeoutRef = useRef();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY);
    setPos(true);
  };

  const onScrollStep = (ref) => {
    if (window.pageYOffset === 0) {
      clearInterval(timeoutRef.current);
    }
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop + 70,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (router && router.query && router.query.slug) {
      setQuery(router.query.slug);
    }
    console.log(query);
    document.addEventListener('scroll', updateScroll);
  }, [router.query]);

  return (
    <>
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
      <div className='header_box'>
        <div className='index_header'>
          <div className='hwmi'>
            <Link href='/category/introduction'>
              <span>HWMI</span>
            </Link>
          </div>
          <div className='grds_logo'>
            <img src={LogoBlack}></img>
          </div>
          <div className='copyright'>
            <span>FINE QUALITY + TRANCEPARENCY</span>
          </div>
        </div>
      </div>
      <>
        <StyledMenu open={open} setOpen={setOpen}>
          <div>
            <div>
              <SearchBar></SearchBar>
            </div>
            <div>
              <StyledNav>
                <Link href='/category/traceability'>
                  <li className='nav_item'>Traceability</li>
                </Link>
                <Link href='/category/product'>
                  <li className='nav_item'>Product</li>
                </Link>
                <Link href='/category/material'>
                  <li className='nav_item'>Material</li>
                </Link>
                <Link href='/category/technology'>
                  <li className='nav_item'>Technology</li>
                </Link>
                <Link href='/category/manufacturing'>
                  <li className='nav_item'>Manufacturing</li>
                </Link>
                <Link href='/category/introduction'>
                  <li
                    className={
                      router &&
                      router.pathname &&
                      router.pathname == '/category/introduction'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Introduction
                  </li>
                </Link>
              </StyledNav>
              <div>
                <div>Go to grds.com</div>
                <div>
                  <img src={LogoBlack} alt='officiallogo'></img>
                </div>
              </div>
            </div>
          </div>
        </StyledMenu>
        <div className='page_container' id='topmenu'>
          <div className='page_navigation1'>
            <div className='header_box'>
              <div
                className={
                  scrollPosition < 180 ? 'before_scroll' : 'after_scroll'
                }
              >
                <h1 onClick={() => setOpen(!open)}>How we make it</h1>
              </div>
              <div className='other_box'>
                <li className='contactright'>
                  <SearchBar></SearchBar>
                </li>
                <StyledBurger open={open} onClick={() => setOpen(!open)}>
                  <div />
                  <div />
                  <div />
                </StyledBurger>
              </div>
            </div>
          </div>
          <div className='page_navigation2'>
            <div
              className={
                scrollPosition < 180
                  ? 'header_box before_scroll'
                  : 'header_box after_scroll'
              }
            >
              <ul className='page_navigation_inner topnav'>
                <Link href='/category/traceability'>
                  <li
                    className={
                      router && query && query == 'traceability'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Traceability
                  </li>
                </Link>
                <Link href='/category/product'>
                  <li
                    className={
                      router && query && query == 'product'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Product
                  </li>
                </Link>
                <Link href='/category/material'>
                  <li
                    className={
                      router && query && query == 'material'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Material
                  </li>
                </Link>
                <Link href='/category/technology'>
                  <li
                    className={
                      router && query && query == 'technology'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Technology
                  </li>
                </Link>
                <Link href='/category/manufacturing'>
                  <li
                    className={
                      router &&
                      router.pathname &&
                      router &&
                      query &&
                      query == 'manufacturing'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Manufacturing
                  </li>
                </Link>
                <Link href='/category/introduction'>
                  <li
                    className={
                      router &&
                      router.pathname &&
                      router.pathname == '/category/introduction'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Introduction
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className='content_box'>
          {router && query && query == 'traceability' ? (
            <div className='module_wrapper'>
              <Traceability></Traceability>
              <Traceability></Traceability>
              <Traceability></Traceability>
              <Traceability></Traceability>
              <Traceability></Traceability>
              <Traceability></Traceability>
            </div>
          ) : null}
          {router && query && query == 'product' ? (
            <div className='module_wrapper'>
              <Product></Product>
              <Product></Product>
              <Product></Product>
            </div>
          ) : null}
          {router && query && query == 'material' ? (
            <div className='module_wrapper'>
              <Material image={materialPath[0]}></Material>
              <Material image={materialPath[1]}></Material>
              <Material image={materialPath[2]}></Material>
            </div>
          ) : null}
          {router && query && query == 'technology' ? (
            <div className='module_wrapper'>
              <Material image={materialPath[0]}></Material>
              <Material image={materialPath[1]}></Material>
              <Material image={materialPath[2]}></Material>
            </div>
          ) : null}
          {router && query && query == 'manufacturing' ? (
            <div className='module_wrapper'>
              <Material image={materialPath[0]}></Material>
              <Material image={materialPath[1]}></Material>
              <Material image={materialPath[2]}></Material>
            </div>
          ) : null}
        </div>
        <GoToTop scrollStepInPx='100' delayInMs='30.50'></GoToTop>
      </>
      <Footer></Footer>
    </>
  );
};

export default Header;

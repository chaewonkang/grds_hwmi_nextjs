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
  Technology,
  Manufacturing,
} from '../../components';

import Link from 'next/link';
import LogoBlack from '../../static/images/LogoBlack.png';
import arrowLeft from '../../static/images/arrowLeft.png';
import arrowRight from '../../static/images/arrowRight.png';

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

const technologyPath = [
  '../static/images/technology/technology_1.png',
  '../static/images/technology/technology_2.png',
];

const manufacturingPath = [
  '../static/images/manufacturing/man_1.png',
  '../static/images/manufacturing/man_2.png',
  '../static/images/manufacturing/man_3.png',
  '../static/images/manufacturing/man_4.png',
  '../static/images/manufacturing/man_5.png',
  '../static/images/manufacturing/man_6.png',
  '../static/images/manufacturing/man_7.png',
  '../static/images/manufacturing/man_8.png',
  '../static/images/manufacturing/man_9.png',
  '../static/images/manufacturing/man_10.png',
];

const categoryArr = [
  'introduction',
  'traceability',
  'product',
  'material',
  'technology',
  'manufacturing',
];

const Header = () => {
  const [pos, setPos] = useState(false);

  const [query, setQuery] = useState('');
  const [navId, setNavId] = useState(null);

  const timeoutRef = useRef();
  const router = useRouter();

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
      setQuery(router.query.slug.toString());
      setNavId(categoryArr.indexOf(query));
    }

    console.log(query);
    document.addEventListener('scroll', updateScroll);
  }, [router.query.slug, navId]);

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
            <a href='https://grds.com' target='_blank'>
              <img src={LogoBlack}></img>
            </a>
          </div>
          <div className='copyright'>
            <span>FINE QUALITY + TRANSPARENCY</span>
          </div>
        </div>
      </div>
      <>
        <div className='page_container' id='topmenu'>
          <div className='page_navigation1'>
            <div className='header_box'>
              <div
                className={
                  scrollPosition < 180 ? 'before_scroll' : 'after_scroll'
                }
              >
                <h1>How we make it</h1>
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
              </ul>
            </div>
          </div>
        </div>
        <div className='content_box'>
          {router && query && query == 'traceability' ? (
            <div className='module_wrapper'>
              <Traceability score={30}></Traceability>
              <Traceability score={40}></Traceability>
              <Traceability score={50}></Traceability>
              <Traceability score={60}></Traceability>
              <Traceability score={70}></Traceability>
              <Traceability score={80}></Traceability>
            </div>
          ) : null}
          {router && query && query == 'product' ? (
            <div className='module_wrapper'>
              <Product></Product>
              <Product></Product>
              <Product></Product>
              <Product></Product>
              <Product></Product>
              <Product></Product>
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
              <Technology image={technologyPath[0]}></Technology>
              <Technology image={technologyPath[1]}></Technology>
            </div>
          ) : null}
          {router && query && query == 'manufacturing' ? (
            <div className='module_wrapper'>
              <Manufacturing image={manufacturingPath[0]}></Manufacturing>
              <Manufacturing image={manufacturingPath[1]}></Manufacturing>
              <Manufacturing image={manufacturingPath[2]}></Manufacturing>
              <Manufacturing image={manufacturingPath[3]}></Manufacturing>
              <Manufacturing image={manufacturingPath[4]}></Manufacturing>
              <Manufacturing image={manufacturingPath[5]}></Manufacturing>
              <Manufacturing image={manufacturingPath[6]}></Manufacturing>
              <Manufacturing image={manufacturingPath[7]}></Manufacturing>
              <Manufacturing image={manufacturingPath[8]}></Manufacturing>
            </div>
          ) : null}
          <div className='test bottom_navigator'>
            <div>
              <div>
                {navId !== null ? (
                  <Link href={`/category/${categoryArr[navId - 1]}`}>
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={arrowLeft}
                      alt='mainImg'
                    ></img>
                  </Link>
                ) : null}
              </div>
              <div>
                {navId !== null ? (
                  <Link href={`/category/${categoryArr[navId + -1]}`}>
                    previous
                  </Link>
                ) : null}
              </div>
            </div>
            <div>
              <div>
                {navId !== null && navId !== 5 ? (
                  <Link href={`/category/${categoryArr[navId + 1]}`}>next</Link>
                ) : null}
              </div>
              <div>
                {navId !== null && navId !== 5 ? (
                  <Link href={`/category/${categoryArr[navId + 1]}`}>
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={arrowRight}
                      alt='mainImg'
                    ></img>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <GoToTop scrollStepInPx='100' delayInMs='30.50'></GoToTop>
      </>
      <Footer></Footer>
    </>
  );
};

export default Header;

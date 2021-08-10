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

import * as Image from '../../axios/_Image';

import Link from 'next/link';
import LogoBlack from '../../static/images/LogoBlack.png';
import arrowLeft from '../../static/images/arrowLeft.png';
import arrowRight from '../../static/images/arrowRight.png';

const categoryArr = [
  'introduction',
  'traceability',
  'product',
  'material',
  'technology',
  'manufacturing',
];

const PageComponent = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [loaded, setLoaded] = useState(false);
  const [pos, setPos] = useState(false);
  const [retVal, setRetVal] = useState(null);
  const [query, setQuery] = useState('');

  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY);
    setPos(true);
  };

  async function fetchImageData() {
    var query = '';
    query = '?type=' + slug;

    const req = { header: {}, data: {}, query: query };
    const result = await Image.getList(req);

    if (result.data && slug && slug == 'traceability') {
      setRetVal(
        result.data.map((item) => {
          return (
            <Traceability
              key={item.id}
              score={
                item &&
                item.page_item &&
                item.page_item[0] &&
                item.page_item[0].point
              }
              image={item && item.image}
              title={
                item &&
                item.page_item &&
                item.page_item[0] &&
                item.page_item[0].title
              }
            ></Traceability>
          );
        })
      );
    } else if (result.data && slug && slug == 'product') {
      setRetVal(
        result.data.map((item) => {
          return (
            <Product
              key={item && item.id}
              image={item && item.image}
              title={
                item &&
                item.page_item &&
                item.page_item[0] &&
                item.page_item[0].title
              }
            ></Product>
          );
        })
      );
    } else if (result.data && slug && slug == 'material') {
      setRetVal(
        result.data.map((item) => {
          return (
            <Material
              image={item && item.image}
              title={
                item &&
                item.page_item &&
                item.page_item[0] &&
                item.page_item[0].title
              }
            ></Material>
          );
        })
      );
    } else if (result.data && slug && slug == 'technology') {
      setRetVal(
        result.data.map((item) => {
          return (
            <Technology
              image={item && item.image}
              title={
                item &&
                item.page_item &&
                item.page_item[0] &&
                item.page_item[0].title
              }
            ></Technology>
          );
        })
      );
    } else if (result.data && slug && slug == 'manufacturing') {
      setRetVal(
        result.data.map((item) => {
          return (
            <Manufacturing
              image={item && item.image}
              title={
                item &&
                item.page_item &&
                item.page_item[0] &&
                item.page_item[0].title
              }
            ></Manufacturing>
          );
        })
      );
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000);

    if (router && router.query && router.query.slug) {
      setQuery(
        router.query.slug &&
          router.query.slug[0] &&
          router.query.slug[0].toString()
      );
    }
    fetchImageData();

    document.addEventListener('scroll', updateScroll);
    return () => {
      document.removeEventListener('scroll', updateScroll);
      clearTimeout(timeout);
    };
  }, [loaded, router]);

  return (
    <>
      <Head>
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
            <div className='module_wrapper'>{retVal}</div>
          ) : null}
          {router && query && query == 'product' ? (
            <div className='module_wrapper'>{retVal}</div>
          ) : null}
          {router && query && query == 'material' ? (
            <div className='module_wrapper'>{retVal}</div>
          ) : null}
          {router && query && query == 'technology' ? (
            <div className='module_wrapper'>{retVal}</div>
          ) : null}
          {router && query && query == 'manufacturing' ? (
            <div className='module_wrapper'>{retVal}</div>
          ) : null}
          <div className='test bottom_navigator'>
            <div>
              <div>
                {router.query.slug &&
                router.query.slug[0] &&
                categoryArr.indexOf(router.query.slug[0].toString()) != 0 ? (
                  <Link
                    href={`/category/${
                      categoryArr[
                        router.query.slug &&
                          router.query.slug[0] &&
                          categoryArr.indexOf(router.query.slug[0].toString()) -
                            1
                      ]
                    }`}
                  >
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={arrowLeft}
                      alt='mainImg'
                    ></img>
                  </Link>
                ) : null}
              </div>
              <div>
                {router.query.slug &&
                router.query.slug[0] &&
                categoryArr.indexOf(router.query.slug[0].toString()) != 0 ? (
                  <Link
                    href={`/category/${
                      categoryArr[
                        router.query.slug &&
                          router.query.slug[0] &&
                          categoryArr.indexOf(router.query.slug[0].toString()) -
                            1
                      ]
                    }`}
                  >
                    previous
                  </Link>
                ) : null}
              </div>
            </div>
            <div>
              <div>
                {router.query.slug &&
                router.query.slug[0] &&
                categoryArr.indexOf(router.query.slug[0].toString()) != 5 ? (
                  <Link
                    href={`/category/${
                      categoryArr[
                        router.query.slug &&
                          router.query.slug[0] &&
                          categoryArr.indexOf(router.query.slug[0].toString()) +
                            1
                      ]
                    }`}
                  >
                    next
                  </Link>
                ) : null}
              </div>
              <div>
                {router.query.slug &&
                router.query.slug[0] &&
                categoryArr.indexOf(router.query.slug[0].toString()) != 5 ? (
                  <Link
                    href={`/category/${
                      categoryArr[
                        categoryArr.indexOf(router.query.slug[0].toString()) + 1
                      ]
                    }`}
                  >
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

export default PageComponent;

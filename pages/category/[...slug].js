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
import jQuery from 'jquery';

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

    // console.log(result);

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
        result.data
          .filter(
            (item) =>
              item.type == 'material_sub' || item.type == 'material_main'
          )
          .map((item) => {
            return (
              <Material
                key={item && item.id}
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
              key={item && item.id}
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
              key={item && item.id}
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

    window.$ = window.jQuery = jQuery;
    if (router && router.query && router.query.slug) {
      setQuery(
        router.query.slug &&
          router.query.slug[0] &&
          router.query.slug[0].toString()
      );
    }
    fetchImageData();

    // DONE-CONDITION1 ::: 스크롤 이동할것 => 완료 조건
    // TODO-CONDITION2 ::: 모바일 일때 (디바이스의 폭이 특정 사이즈 일때) ::: 768px 일때
    // DONE-CONDITION3 ::: 어떤 영역을 클릭할때 일어난다 ::: 화살표영역

    const prev_arrow0 = document.getElementById('prev_arrow0');
    const next_arrow0 = document.getElementById('next_arrow0');
    const prev_arrow1 = document.getElementById('prev_arrow1');
    const next_arrow1 = document.getElementById('next_arrow1');
    const page_nav_container1 = document.getElementById('page_nav_container1');

    // console.log('page_nav_container1');
    // console.log(page_nav_container1);
    if (prev_arrow0) {
      //   console.log('prev_arrow0.addEventListener');
      prev_arrow0.addEventListener('click', () => {
        // event.preventDefault();
        // console.log('prev_arrow0.addEventListener');
        // TODO ::: 계산 (블럭의 크기가 가변적이지 않다면,px로 정해져 있다면) :: +=specific_px
        $('#page_nav_container1').animate(
          {
            scrollLeft: '-=300px',
          },
          'fast'
          // 'slow'
        );
      });
      prev_arrow0.removeEventListener('click');
    }
    if (prev_arrow1) {
      //   console.log('prev_arrow1.addEventListener');
      prev_arrow1.addEventListener('click', () => {
        // event.preventDefault();
        // console.log('prev_arrow1.addEventListener');
        // TODO ::: 계산 (블럭의 크기가 가변적이지 않다면,px로 정해져 있다면) :: +=specific_px
        $('#page_nav_container1').animate(
          {
            scrollLeft: '-=300px',
          },
          'fast'
          // 'slow'
        );
      });
      prev_arrow1.removeEventListener('click');
    }
    if (next_arrow0) {
      next_arrow0.addEventListener('click', () => {
        // event.preventDefault();
        // console.log('next_arrow0.addEventListener');
        $('#page_nav_container1').animate(
          {
            scrollLeft: '+=50px',
          },
          'fast'
        );
      });
    }
    if (next_arrow1) {
      next_arrow1.addEventListener('click', () => {
        // event.preventDefault();
        // console.log('next_arrow1.addEventListener');
        $('#page_nav_container1').animate(
          {
            scrollLeft: '+=50px',
          },
          'fast'
        );
      });
    }

    document.addEventListener('scroll', updateScroll);
    return () => {
      document.removeEventListener('scroll', updateScroll);
      clearTimeout(timeout);
    };
  }, [loaded, router]);

  // RENDER- RENDER()
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
          {/* TODO-#226 */}
          <div id='page_navigation2' className='page_navigation2'>
            <div
              className={
                scrollPosition < 180
                  ? 'header_box before_scroll'
                  : 'header_box after_scroll'
              }
            >
              <ul
                id='page_nav_container1'
                className='page_navigation_inner topnav'
              >
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
                    id='prev_arrow0'
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
                    id='prev_arrow1'
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
              <div id='next_arrow0'>
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
              <div id='next_arrow1'>
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

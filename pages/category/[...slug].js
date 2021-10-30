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

    if (result.data && slug && slug == 'traceability') {
      var added_product_type = [];
      var tr_returns0 = [];
      const tr_returns1 = result.data
        .sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        .map((item) => {
          return item;
        });
      tr_returns0 = [...tr_returns1];
      console.log(tr_returns1);
      setRetVal(
        tr_returns0.map((item) => {
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
      var added_product_type = [];
      var pr_returns0 = [];
      const pr_returns1 = result.data
        .sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        .map((item) => {
          return item;
        });
      pr_returns0 = [...pr_returns1];
      setRetVal(
        pr_returns0.map((item) => {
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
      var added_product_type = [];
      var mt_returns0 = [];
      const mt_returns1 = result.data
        .filter((item) => item.type == 'material_main')
        .map((item) => {
          return item;
        });
      const mt_returns2 = result.data
        .filter(
          (item) =>
            item.type == 'material_sub' ||
            item.type == 'material_main_gif' ||
            item.type == 'material_oustsole' ||
            item.type == 'material_outsole_gif' ||
            item.type == 'material_midsole'
        )
        .filter((item, index) => {
          const splitWord1 = '-';
          const search1 =
            item.page_item[0].title.split(splitWord1)[0] +
            splitWord1 +
            item.page_item[0].title.split(splitWord1)[1];
          if (added_product_type.toString().indexOf(search1) > -1) {
            return null;
          } else {
            const product_title1 = (
              item.page_item[0].title.split(splitWord1)[0] +
              splitWord1 +
              item.page_item[0].title.split(splitWord1)[1]
            ).replaceAll('/', '');
            added_product_type.push(product_title1);
            return item;
          }
        })
        .map((item) => {
          return item;
        });

      mt_returns0 = [...mt_returns1, ...mt_returns2];

      setRetVal(
        mt_returns0.map((item) => {
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
      var added_product_type0 = [];
      var added_product_type1 = [];
      var tn_returns0 = [];

      const tn_returns1 = result.data
        .filter((item) => !(item.type == 'technology'))
        .map((item) => {
          return item;
        });

      const tn_returns2 = result.data
        .filter((item) => item.type == 'technology')
        .filter((item, index) => {
          const splitWord1 = '-';
          const search1 =
            item.page_item[0].title.split(splitWord1)[0] +
            splitWord1 +
            item.page_item[0].title.split(splitWord1)[1];
          if (
            added_product_type1.toString().indexOf(item.page_item[0].title) > -1
          ) {
            return item;
          }
          if (added_product_type0.toString().indexOf(search1) > -1) {
            return null;
          } else {
            const product_title1 = (
              item.page_item[0].title.split(splitWord1)[0] +
              splitWord1 +
              item.page_item[0].title.split(splitWord1)[1]
            ).replaceAll('/', '');
            added_product_type0.push(product_title1);
            added_product_type1.push(item.page_item[0].title);
            return item;
          }
        })
        .sort((a, b) => (a.page_item[0].title > b.page_item[0].title ? 1 : -1))
        .map((item) => {
          return item;
        });
      tn_returns0 = [...tn_returns2];

      setRetVal(
        tn_returns0.map((item) => {
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
      var added_product_type0 = [];
      var added_product_type1 = [];
      var mf_returns0 = [];

      const mf_returns1 = result.data
        .filter((item) => !(item.type == 'manufacturing_gif'))
        .map((item) => {
          //   console.log('manufacturing_gif');
          //   console.log(item);
          return item;
        });

      const mf_returns2 = result.data
        .filter((item) => item.type == 'manufacturing_gif')
        .filter((item, index) => {
          const splitWord1 = '-';
          const search1 =
            item.page_item[0].title.split(splitWord1)[0] +
            splitWord1 +
            item.page_item[0].title.split(splitWord1)[1];
          if (
            added_product_type1.toString().indexOf(item.page_item[0].title) > -1
          ) {
            return item;
          }
          if (added_product_type0.toString().indexOf(search1) > -1) {
            return null;
          } else {
            const product_title1 = (
              item.page_item[0].title.split(splitWord1)[0] +
              splitWord1 +
              item.page_item[0].title.split(splitWord1)[1]
            ).replaceAll('/', '');
            added_product_type0.push(product_title1);
            added_product_type1.push(item.page_item[0].title);
            return item;
          }
        })
        .sort((a, b) => (a.page_item[0].title > b.page_item[0].title ? 1 : -1))
        .map((item) => {
          return item;
        });

      // mf_returns0 = [...mf_returns1, ...mf_returns2];
      mf_returns0 = [...mf_returns2];

      setRetVal(
        mf_returns0.map((item) => {
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

    if (prev_arrow0) {
      prev_arrow0.addEventListener('click', () => {
        // event.preventDefault();
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
      prev_arrow1.addEventListener('click', () => {
        // event.preventDefault();
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

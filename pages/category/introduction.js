import Head from 'next/head';
import React, {
  Component,
  createRef,
  useState,
  useEffect,
  useRef,
} from 'react';

import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { Footer } from '../../components';
import * as Page from '../../axios/_Page';

import Link from 'next/link';
import LogoBlack from '../../static/images/LogoBlack.png';
import arrowRight from '../../static/images/arrowRight.png';
import { GoToTop } from '../../components';

const imagePath07 = [
  '../static/images/emblem.png',
  '../static/images/introduction/int_2.png',
  '../static/images/introduction/int_3.jpeg',
  '../static/images/introduction/int_4.jpeg',
  '../static/images/introduction/int_5.jpeg',
];

const Header = () => {
  const [loaded, setLoaded] = useState(false);
  const [pos, setPos] = useState(false);
  const [introData, setIntroData] = useState(null);
  const [introText, setIntroText] = useState(null);
  const [introImages, setIntroImages] = useState(null);

  const timeoutRef = useRef();

  const router = useRouter();

  const topRef = useRef();
  const matRef = useRef();
  const manRef = useRef();
  const locRef = useRef();
  const tecRef = useRef();
  const tracRef = useRef();
  const outRef = useRef();
  const subRef = useRef();
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

  async function fetchIntroData() {
    var query = '';
    query = '?type=' + 'page100';

    console.log('[fetchPageData] query');
    console.log(query);

    const req = { header: {}, data: {}, query: query };
    const result = await Page.getList(req);

    console.log('[fetchPageData] result');
    console.log(result);

    if (result.data && result.data[0]) {
      setIntroText(result.data[0].page_descs);
      setIntroImages(result.data[0].page_images);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000);
    fetchIntroData();
    return () => clearTimeout(timeout);
  }, [loaded]);

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
                      router.pathname == '/category/introduction'
                        ? 'nav_item active'
                        : 'nav_item'
                    }
                  >
                    Introduction
                  </li>
                </Link>
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
              </ul>
            </div>
          </div>
        </div>
        <div className='content_box'>
          <div className='test introduction' ref={topRef}>
            <div>
              {scrollPosition &&
              topRef &&
              scrollPosition > topRef.current.offsetTop ? (
                <img src={imagePath07[0]} alt='mainImg'></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={imagePath07[0]}
                  alt='mainImg'
                ></img>
              )}
            </div>
            <div>
              <div>
                <Link href='/category/introduction'>
                  <span>HWMI</span>
                </Link>
              </div>
              <div>
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={LogoBlack}
                  alt='logo'
                ></img>
              </div>
              <div>
                {introText && introText[0] && parse(introText[0].description)}
              </div>
            </div>
          </div>

          <div className='introduction_fullimg' ref={locRef}>
            <div>
              {scrollPosition &&
              subRef &&
              scrollPosition > subRef.current.offsetTop ? (
                <img
                  src={introImages && introImages[0] && introImages[0].image}
                  alt={introImages && introImages[0] && introImages[0].imageAlt}
                ></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={imagePath07[3]}
                  alt='mainImg'
                ></img>
              )}
            </div>
          </div>
          <div className='test introduction_fulltext' ref={subRef}>
            <div>
              {introText && introText[1] && parse(introText[1].description)}
            </div>
          </div>
          <div className='introduction_fullimg' ref={locRef}>
            <div>
              {scrollPosition &&
              subRef &&
              scrollPosition > subRef.current.offsetTop ? (
                <img
                  src={introImages && introImages[1] && introImages[1].image}
                  alt={introImages && introImages[1] && introImages[1].imageAlt}
                ></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={introImages && introImages[1] && introImages[1].image}
                  alt={introImages && introImages[1] && introImages[1].imageAlt}
                ></img>
              )}
            </div>
          </div>
          <div className='test introduction_fulltext'>
            <div>
              {introText && introText[2] && parse(introText[2].description)}
            </div>
          </div>
          <div className='test bottom_navigator'>
            <div></div>
            <div>
              <div>
                <Link href='/category/traceability'>next</Link>
              </div>
              <div>
                <Link href='/category/traceability'>
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={arrowRight}
                    alt='mainImg'
                  ></img>
                </Link>
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

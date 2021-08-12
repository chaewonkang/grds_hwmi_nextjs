import Head from 'next/head';
import Link from 'next/link';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toJS } from 'mobx';

import parse from 'html-react-parser';

import * as Page from '../../axios/_Page';
import * as Category from '../../axios/_Category';

import LogoBlack from '../../static/images/LogoBlack.png';
import Emblem from '../../static/images/emblem.png';
import arrowLeft from '../../static/images/arrowLeft.png';
import arrowRight from '../../static/images/arrowRight.png';

import { GoToTop, GoToShop, Footer, Map, Score } from '../../components';

const imagePath07 = ['../static/images/temblem.png'];

const PageComponent = ({ props }) => {
  const [loaded, setLoaded] = useState(false);
  const [pos, setPos] = useState(false);
  const [query, setQuery] = useState('');
  const [pageData, setPageData] = useState(null);

  /* score, link, location, data preprecessing */
  const [score, setScore] = useState(0);
  const [links, setLinks] = useState(null);
  const [location, setLocation] = useState(null);
  const [update, setUpdate] = useState(null);

  /* images preprocessing */
  const [mainImage, setMainImage] = useState(null);
  const [tracImage, setTracImage] = useState(null);
  const [mainMatImages, setMainMatImages] = useState(null);
  const [mainMatGifs, setMainMatGifs] = useState(null);
  const [subMatImages, setSubMatImages] = useState(null);
  const [outsoleImage, setOutsoleImage] = useState(null);
  const [outsoleGifs, setOutsoleGifs] = useState(null);
  const [techImages, setTechImages] = useState(null);
  const [manGifs, setManGifs] = useState(null);
  const [midsoleImages, setMidsoleImages] = useState(null);

  /* category preprocessing */
  const [category, setCategory] = useState([
    {
      created_at: '',
      description: '',
      id: '',
      ordering: 0,
      title: '',
      updated_at: '',
    },
  ]);

  /* text preprocessing */
  const [productDesc, setProductDesc] = useState(null);
  const [mainMatDesc, setMainMatDesc] = useState(null);
  const [subMatDesc, setSubMatDesc] = useState(null);
  const [outsoleDesc, setOutsoleDesc] = useState(null);
  const [techDesc, setTechDesc] = useState(null);
  const [manDesc, setManDesc] = useState(null);
  const [introText, setIntroText] = useState(null);
  const [midsoleDesc, setMidsoleDesc] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  const timeoutRef = useRef();

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

  const filteredImages = (keyword) => {
    return (
      pageData &&
      pageData.page_images
        .filter((nonFilteredItem) => {
          if (nonFilteredItem && nonFilteredItem.type == keyword) {
            return nonFilteredItem.image;
          } else {
            return null;
          }
        })
        .map((filteredItem, filteredIndex) => {
          return filteredItem;
        })
    );
  };

  const filteredDesc = (keyword) => {
    return (
      pageData &&
      pageData.page_descs
        .filter((nonFilteredItem) => {
          if (nonFilteredItem && nonFilteredItem.type == keyword) {
            return nonFilteredItem.description;
          } else {
            return null;
          }
        })
        .map((filteredItem, filteredIndex) => {
          return filteredItem.description;
        })
    );
  };

  const scrollToRef = (ref) => {
    timeoutRef.current = setInterval(onScrollStep(ref), 3000);
  };

  async function fetchPageData() {
    console.log('[fetchPageData] 142- CALLED');
    var query = '';
    query = '?slug=' + slug;

    // console.log(query);

    const req = { header: {}, data: {}, query: query };
    const result = await Page.getList(req);

    if (result.data && result.data[0]) {
      // TODO- 해당 시점에 맞추어서 분기(Condition) 처리
      setPageData(result.data[0]);

      // TODO-STEP1-#154-SCORE
      //   console.log('TODO-STEP1-#154-SCORE');
      //   console.log(result.data[0].point);
      //   console.log(parseInt(result.data[0].point));

      setTracImage(filteredImages('traceability'));
      setMainMatImages(filteredImages('material_main'));
      setMainMatGifs(filteredImages('material_main_gif'));
      setSubMatImages(filteredImages('material_sub'));
      setOutsoleImage(filteredImages('material_outsole'));
      setOutsoleGifs(filteredImages('material_outsole_gif'));
      setTechImages(filteredImages('technology'));
      setManGifs(filteredImages('manufacturing_gif'));
      setMidsoleImages(filteredImages('material_midsole'));

      setProductDesc(filteredDesc('product'));
      setMainMatDesc(filteredDesc('material_main'));
      setSubMatDesc(filteredDesc('material_sub'));
      setOutsoleDesc(filteredDesc('material_outsole'));
      setTechDesc(filteredDesc('technology'));
      setManDesc(filteredDesc('manufacturing'));
      setMidsoleDesc(filteredDesc('material_midsole'));

      setScore(parseInt(result.data[0].point));
      setLinks(result.data[0].page_links);
      setUpdate(result.data[0].updated_at);
      if (result.data[0].page_areas && result.data[0].page_areas[0])
        setLocation(result.data[0].page_areas[0].area_info1);
    }
  }

  async function fetchCategoryData() {
    console.log('[fetchCategoryData] 153- CALLED');
    var query = '';
    query = '?type=' + 'introduction';
    const req = { header: {}, data: {}, query: query };
    const result = await Category.getList(req);
    if (result && result.data) {
      setCategory([...result.data]);
    }
  }

  async function fetchIntroData() {
    var query = '';
    query = '?type=' + 'page100';

    // console.log('[fetchPageData] query');
    // console.log(query);

    const req = { header: {}, data: {}, query: query };
    const result = await Page.getList(req);

    // console.log('[fetchPageData] result');
    // console.log(result);

    if (result.data && result.data[0]) {
      setIntroText(result.data[0].page_descs);
    }
  }

  useEffect(() => {
    if (router && router.query && router.query.slug) {
      setQuery(router.query.slug);
    }
    document.addEventListener('scroll', updateScroll);
    const timeout = setTimeout(() => setLoaded(true), 1000);
    fetchCategoryData();
    fetchPageData();
    fetchIntroData();
    console.log(pageData);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('scroll', updateScroll);
    };
  }, [loaded, router.query]);

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
                <h1>
                  {pageData &&
                    pageData.title &&
                    pageData.title.replace(/-/g, ' ')}
                </h1>
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
                <li className='nav_item' onClick={() => scrollToRef(tracRef)}>
                  Traceability
                </li>
                <li className='nav_item' onClick={() => scrollToRef(topRef)}>
                  Product
                </li>
                <li className='nav_item' onClick={() => scrollToRef(matRef)}>
                  Material
                </li>
                {techDesc && techDesc.length != 0 ? (
                  <li className='nav_item' onClick={() => scrollToRef(tecRef)}>
                    Technology
                  </li>
                ) : (
                  <li className='nav_item deactive' style={{ color: '#888' }}>
                    Technology
                  </li>
                )}
                <li className='nav_item' onClick={() => scrollToRef(manRef)}>
                  Manufacturing
                </li>
                <li className='nav_item' onClick={() => scrollToRef(locRef)}>
                  Introduction
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='content_box'>
          <div className='category_desc'>
            <div>
              <span>추적가능성</span>
            </div>
            <div>
              <p>
                {category &&
                  toJS(category).map((item, mobxIndex) => {
                    if (item.title == '추적가능성') return item.description;
                  })}
              </p>
            </div>
          </div>
          <div className='test traceability' ref={tracRef}>
            <div className='traceability_topimg'>
              {scrollPosition &&
              tracRef &&
              scrollPosition > tracRef.current.offsetTop ? (
                <img
                  src={tracImage && tracImage[0] && tracImage[0].image}
                  alt={tracImage && tracImage[0] && tracImage[0].imageAlt}
                ></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={tracImage && tracImage[0] && tracImage[0].image}
                  alt={tracImage && tracImage[0] && tracImage[0].imageAlt}
                ></img>
              )}
            </div>
            <div>
              <div>
                <div id='loading'>
                  <div className='score'>
                    {score && <Score score={score}></Score>}%
                  </div>
                </div>
              </div>
              <div className='traceability_emblem'>
                {scrollPosition &&
                tracRef &&
                scrollPosition > tracRef.current.offsetTop + 100 ? (
                  <img src={Emblem} alt='emblemImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={Emblem}
                    alt='emblemImg'
                    className='balloon--bounce'
                  ></img>
                )}
              </div>
            </div>
          </div>
          <div className='category_desc'>
            <div>
              <span>제품</span>
            </div>
            <div>
              <p>
                {category &&
                  toJS(category).map((item, mobxIndex) => {
                    if (item.title == '제품') return item.description;
                  })}
              </p>
            </div>
          </div>
          <div className='test item' ref={topRef}>
            <div>
              {scrollPosition &&
              topRef &&
              scrollPosition > topRef.current.offsetTop ? (
                <img
                  src={pageData && pageData.image}
                  alt={pageData && pageData.imageAlt}
                ></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={pageData && pageData.image}
                  alt={pageData && pageData.imageAlt}
                ></img>
              )}
            </div>
            <div>{productDesc && productDesc[0] && parse(productDesc[0])}</div>
          </div>
          <div className='category_desc'>
            <div>
              <span>소재</span>
            </div>
            <div>
              <p>
                {category &&
                  toJS(category).map((item, mobxIndex) => {
                    if (item.title == '소재') return item.description;
                  })}
              </p>
            </div>
          </div>
          <div
            className='test material'
            ref={matRef}
            style={
              mainMatDesc && mainMatDesc.length < 3
                ? {
                    height: '75vh',
                  }
                : null
            }
          >
            <div
              className='material_column_small'
              style={
                mainMatDesc && mainMatDesc.length < 3
                  ? {
                      borderBottom: 'none',
                      height: '100%',
                    }
                  : null
              }
            >
              <div
                style={
                  mainMatImages && mainMatImages.length == 2
                    ? { width: '50%' }
                    : null
                }
              >
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop ? (
                    <img
                      src={
                        mainMatImages &&
                        mainMatImages[0] &&
                        mainMatImages[0].image
                      }
                      alt={
                        mainMatImages &&
                        mainMatImages[0] &&
                        mainMatImages[0].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        mainMatImages &&
                        mainMatImages[0] &&
                        mainMatImages[0].image
                      }
                      alt={
                        mainMatImages &&
                        mainMatImages[0] &&
                        mainMatImages[0].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {mainMatDesc && mainMatDesc[0] && parse(mainMatDesc[0])}
                </div>
              </div>
              <div
                style={
                  mainMatImages && mainMatImages.length == 2
                    ? { width: '50%' }
                    : null
                }
              >
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop ? (
                    <img
                      src={
                        mainMatImages &&
                        mainMatImages[1] &&
                        mainMatImages[1].image
                      }
                      alt={
                        mainMatImages &&
                        mainMatImages[1] &&
                        mainMatImages[1].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        mainMatImages &&
                        mainMatImages[1] &&
                        mainMatImages[1].image
                      }
                      alt={
                        mainMatImages &&
                        mainMatImages[1] &&
                        mainMatImages[1].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {mainMatDesc && mainMatDesc[1] && parse(mainMatDesc[1])}
                </div>
              </div>
              {mainMatImages && mainMatImages.length > 2 && (
                <div>
                  <div>
                    {scrollPosition &&
                    matRef &&
                    scrollPosition > matRef.current.offsetTop ? (
                      <img
                        src={
                          mainMatImages &&
                          mainMatImages[2] &&
                          mainMatImages[2].image
                        }
                        alt={
                          mainMatImages &&
                          mainMatImages[2] &&
                          mainMatImages[2].imageAlt
                        }
                      ></img>
                    ) : (
                      <img
                        style={{ filter: 'grayscale(100%)' }}
                        src={
                          mainMatImages &&
                          mainMatImages[2] &&
                          mainMatImages[2].image
                        }
                        alt={
                          mainMatImages &&
                          mainMatImages[2] &&
                          mainMatImages[2].imageAlt
                        }
                      ></img>
                    )}
                  </div>
                  <div>
                    {mainMatDesc && mainMatDesc[2] && parse(mainMatDesc[2])}
                  </div>
                </div>
              )}
            </div>
            {mainMatGifs && mainMatGifs.length > 1 && (
              <div className='gif_column_small'>
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop + 300 ? (
                    <img
                      src={
                        mainMatGifs && mainMatGifs[0] && mainMatGifs[0].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[0] && mainMatGifs[0].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        mainMatGifs && mainMatGifs[0] && mainMatGifs[0].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[0] && mainMatGifs[0].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop + 400 ? (
                    <img
                      src={
                        mainMatGifs && mainMatGifs[1] && mainMatGifs[1].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[1] && mainMatGifs[1].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        mainMatGifs && mainMatGifs[1] && mainMatGifs[1].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[1] && mainMatGifs[1].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop + 500 ? (
                    <img
                      src={
                        mainMatGifs && mainMatGifs[2] && mainMatGifs[2].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[2] && mainMatGifs[2].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        mainMatGifs && mainMatGifs[2] && mainMatGifs[2].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[2] && mainMatGifs[2].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop + 600 ? (
                    <img
                      src={
                        mainMatGifs && mainMatGifs[3] && mainMatGifs[3].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[3] && mainMatGifs[3].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        mainMatGifs && mainMatGifs[3] && mainMatGifs[3].image
                      }
                      alt={
                        mainMatGifs && mainMatGifs[3] && mainMatGifs[3].imageAlt
                      }
                    ></img>
                  )}
                </div>
              </div>
            )}
          </div>
          {mainMatGifs && mainMatGifs.length > 4 && (
            <div
              className='gif_column_small_added'
              style={{
                height: 'calc((100vh - 150px) / 2)',
                marginTop: '-1px !important',
                boxSizing: 'border-box',
                width: '100%',
                borderBottom: '1px solid #888',
              }}
            >
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 700 ? (
                  <img
                    src={mainMatGifs && mainMatGifs[4] && mainMatGifs[4].image}
                    alt={
                      mainMatGifs && mainMatGifs[4] && mainMatGifs[4].imageAlt
                    }
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={mainMatGifs && mainMatGifs[4] && mainMatGifs[4].image}
                    alt={
                      mainMatGifs && mainMatGifs[4] && mainMatGifs[4].imageAlt
                    }
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 800 ? (
                  <img
                    src={mainMatGifs && mainMatGifs[5] && mainMatGifs[5].image}
                    alt={
                      mainMatGifs && mainMatGifs[5] && mainMatGifs[5].imageAlt
                    }
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={mainMatGifs && mainMatGifs[5] && mainMatGifs[5].image}
                    alt={
                      mainMatGifs && mainMatGifs[5] && mainMatGifs[5].imageAlt
                    }
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 900 ? (
                  <img
                    src={mainMatGifs && mainMatGifs[6] && mainMatGifs[6].image}
                    alt={
                      mainMatGifs && mainMatGifs[6] && mainMatGifs[6].imageAlt
                    }
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={mainMatGifs && mainMatGifs[6] && mainMatGifs[6].image}
                    alt={
                      mainMatGifs && mainMatGifs[6] && mainMatGifs[6].imageAlt
                    }
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 1000 ? (
                  <img
                    src={mainMatGifs && mainMatGifs[7] && mainMatGifs[7].image}
                    alt={
                      mainMatGifs && mainMatGifs[7] && mainMatGifs[7].imageAlt
                    }
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={mainMatGifs && mainMatGifs[7] && mainMatGifs[7].image}
                    alt={
                      mainMatGifs && mainMatGifs[7] && mainMatGifs[7].imageAlt
                    }
                  ></img>
                )}
              </div>
            </div>
          )}
          <div className='category_desc'>
            <div>
              <span>아웃솔</span>
            </div>
            <div>
              <p>
                {category &&
                  toJS(category).map((item, mobxIndex) => {
                    if (item.title == '아웃솔') return item.description;
                  })}
              </p>
            </div>
          </div>
          <div
            className='test manufacturing'
            ref={outRef}
            style={
              outsoleGifs && outsoleGifs.length < 1 ? { height: '35vh' } : null
            }
          >
            <div
              className='manufacturing_intro'
              style={
                outsoleGifs && outsoleGifs.length < 1
                  ? { height: '100%' }
                  : null
              }
            >
              <div>
                {outsoleDesc && outsoleDesc[0] && parse(outsoleDesc[0])}
              </div>
              <div>
                {scrollPosition &&
                outRef &&
                scrollPosition > outRef.current.offsetTop ? (
                  <img
                    src={
                      outsoleImage && outsoleImage[0] && outsoleImage[0].image
                    }
                    alt={
                      outsoleImage &&
                      outsoleImage[0] &&
                      outsoleImage[0].imageAlt
                    }
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={
                      outsoleImage && outsoleImage[0] && outsoleImage[0].image
                    }
                    alt={
                      outsoleImage &&
                      outsoleImage[0] &&
                      outsoleImage[0].imageAlt
                    }
                  ></img>
                )}
              </div>
            </div>
            {outsoleGifs && outsoleGifs.length > 1 && (
              <div className='manufacturing_gif'>
                <div>
                  {scrollPosition &&
                  outRef &&
                  scrollPosition > outRef.current.offsetTop + 100 ? (
                    <img
                      src={
                        outsoleGifs && outsoleGifs[1] && outsoleGifs[0].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[1] && outsoleGifs[0].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        outsoleGifs && outsoleGifs[1] && outsoleGifs[0].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[1] && outsoleGifs[0].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {scrollPosition &&
                  outRef &&
                  scrollPosition > outRef.current.offsetTop + 200 ? (
                    <img
                      src={
                        outsoleGifs && outsoleGifs[2] && outsoleGifs[1].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[2] && outsoleGifs[1].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        outsoleGifs && outsoleGifs[2] && outsoleGifs[1].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[2] && outsoleGifs[1].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {scrollPosition &&
                  outRef &&
                  scrollPosition > outRef.current.offsetTop + 200 ? (
                    <img
                      src={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[2].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[2].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[2].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[2].imageAlt
                      }
                    ></img>
                  )}
                </div>
                <div>
                  {scrollPosition &&
                  outRef &&
                  scrollPosition > outRef.current.offsetTop + 300 ? (
                    <img
                      src={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[3].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[3].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[3].image
                      }
                      alt={
                        outsoleGifs && outsoleGifs[3] && outsoleGifs[3].imageAlt
                      }
                    ></img>
                  )}
                </div>
              </div>
            )}
          </div>
          {midsoleDesc && midsoleDesc.length != 0 && (
            <div
              className='test manufacturing'
              ref={outRef}
              style={
                outsoleGifs && outsoleGifs.length < 1
                  ? { height: '35vh' }
                  : null
              }
            >
              <div
                className='manufacturing_intro'
                style={
                  outsoleGifs && outsoleGifs.length < 1
                    ? { height: '100%' }
                    : null
                }
              >
                <div>
                  {midsoleDesc && midsoleDesc[0] && parse(midsoleDesc[0])}
                </div>
                <div>
                  {scrollPosition &&
                  outRef &&
                  scrollPosition > outRef.current.offsetTop ? (
                    <img
                      src={
                        midsoleImages &&
                        midsoleImages[0] &&
                        midsoleImages[0].image
                      }
                      alt={
                        midsoleImages &&
                        midsoleImages[0] &&
                        midsoleImages[0].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        midsoleImages &&
                        midsoleImages[0] &&
                        midsoleImages[0].image
                      }
                      alt={
                        midsoleImages &&
                        midsoleImages[0] &&
                        midsoleImages[0].imageAlt
                      }
                    ></img>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className='category_desc'>
            <div>
              <span>기타소재</span>
            </div>
            <div>
              <p>
                {category &&
                  toJS(category).map((item, mobxIndex) => {
                    if (item.title == '기타소재') return item.description;
                  })}
              </p>
            </div>
          </div>
          <div className='test sub_material' ref={subRef}>
            <div className='sub_material_img'>
              <div
                style={
                  subMatImages && subMatImages.length == 1
                    ? { height: '100%' }
                    : null
                }
              >
                {scrollPosition &&
                subRef &&
                scrollPosition > subRef.current.offsetTop ? (
                  <img
                    src={
                      subMatImages && subMatImages[0] && subMatImages[0].image
                    }
                    alt={
                      subMatImages &&
                      subMatImages[0] &&
                      subMatImages[0].imageAlt
                    }
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={
                      subMatImages && subMatImages[0] && subMatImages[0].image
                    }
                    alt={
                      subMatImages &&
                      subMatImages[0] &&
                      subMatImages[0].imageAlt
                    }
                  ></img>
                )}
              </div>
              {subMatImages && subMatImages.length >= 2 && (
                <div>
                  {scrollPosition &&
                  subRef &&
                  scrollPosition > subRef.current.offsetTop + 100 ? (
                    <img
                      src={
                        subMatImages && subMatImages[1] && subMatImages[1].image
                      }
                      alt={
                        subMatImages &&
                        subMatImages[1] &&
                        subMatImages[1].imageAlt
                      }
                    ></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={
                        subMatImages && subMatImages[1] && subMatImages[1].image
                      }
                      alt={
                        subMatImages &&
                        subMatImages[1] &&
                        subMatImages[1].imageAlt
                      }
                    ></img>
                  )}
                </div>
              )}
            </div>
            <div className='sub_material_intro'>
              <div>{subMatDesc && subMatDesc[0] && parse(subMatDesc[0])}</div>
            </div>
          </div>
          {techDesc && techDesc.length != 0 && (
            <>
              <div className='category_desc'>
                <div>
                  <span>기술</span>
                </div>
                <div>
                  <p>
                    {category &&
                      toJS(category).map((item, mobxIndex) => {
                        if (item.title == '기술') return item.description;
                      })}
                  </p>
                </div>
              </div>
              <div className='test technology' ref={tecRef}>
                <div className='technology_intro'>
                  <div>{techDesc && techDesc[0] && parse(techDesc[0])}</div>
                  <div>
                    <a
                      href={
                        links &&
                        links
                          .filter((item) => item.type == 'technology')
                          .map((item) => {
                            return item.url;
                          })
                      }
                      target='_blank'
                    >
                      <span>Go to biomechanics</span>
                    </a>
                  </div>
                </div>
                <div className='technology_img'>
                  <div>
                    {scrollPosition &&
                    tecRef &&
                    tecRef.current &&
                    scrollPosition > tecRef.current.offsetTop ? (
                      <img
                        src={techImages && techImages[0] && techImages[0].image}
                        alt={
                          techImages && techImages[0] && techImages[0].imageAlt
                        }
                      ></img>
                    ) : (
                      <img
                        style={{ filter: 'grayscale(100%)' }}
                        src={techImages && techImages[0] && techImages[0].image}
                        alt={
                          techImages && techImages[0] && techImages[0].imageAlt
                        }
                      ></img>
                    )}
                  </div>
                  <div>
                    {scrollPosition &&
                    tecRef &&
                    scrollPosition > tecRef.current.offsetTop + 100 ? (
                      <img
                        src={techImages && techImages[1] && techImages[1].image}
                        alt={
                          techImages && techImages[1] && techImages[1].imageAlt
                        }
                      ></img>
                    ) : (
                      <img
                        style={{ filter: 'grayscale(100%)' }}
                        src={techImages && techImages[1] && techImages[1].image}
                        alt={
                          techImages && techImages[1] && techImages[1].imageAlt
                        }
                      ></img>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className='category_desc'>
            <div>
              <span>공정</span>
            </div>
            <div>
              <p>
                {category &&
                  toJS(category).map((item, mobxIndex) => {
                    if (item.title == '공정') return item.description;
                  })}
              </p>
            </div>
          </div>
          <div className='test manufacturing' ref={manRef}>
            <div className='manufacturing_intro'>
              <div>{manDesc && manDesc[0] && parse(manDesc[0])}</div>
              <div>{location && <Map location={location}></Map>}</div>
            </div>
            <div className='manufacturing_gif'>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 100 ? (
                  <img
                    src={manGifs && manGifs[0] && manGifs[0].image}
                    alt={manGifs && manGifs[0] && manGifs[0].imageAlt}
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={manGifs && manGifs[0] && manGifs[0].image}
                    alt={manGifs && manGifs[0] && manGifs[0].imageAlt}
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 200 ? (
                  <img
                    src={manGifs && manGifs[1] && manGifs[1].image}
                    alt={manGifs && manGifs[1] && manGifs[1].imageAlt}
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={manGifs && manGifs[1] && manGifs[1].image}
                    alt={manGifs && manGifs[1] && manGifs[1].imageAlt}
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 300 ? (
                  <img
                    src={manGifs && manGifs[2] && manGifs[2].image}
                    alt={manGifs && manGifs[2] && manGifs[2].imageAlt}
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={manGifs && manGifs[2] && manGifs[2].image}
                    alt={manGifs && manGifs[2] && manGifs[2].imageAlt}
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 400 ? (
                  <img
                    src={manGifs && manGifs[3] && manGifs[3].image}
                    alt={manGifs && manGifs[3] && manGifs[3].imageAlt}
                  ></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={manGifs && manGifs[3] && manGifs[3].image}
                    alt={manGifs && manGifs[3] && manGifs[3].imageAlt}
                  ></img>
                )}
              </div>
            </div>
          </div>
          <div className='category_desc'>
            <div>
              <span>공정</span>
            </div>
            <div>
              <p>
                {category &&
                  toJS(category).map((item, mobxIndex) => {
                    if (item.title == '공정') return item.description;
                  })}
              </p>
            </div>
          </div>
          <div className='test introduction' ref={locRef}>
            <div>
              {scrollPosition &&
              locRef &&
              scrollPosition > locRef.current.offsetTop ? (
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
                  alt='mainImg'
                ></img>
              </div>
              <div>
                {introText && introText[0] && parse(introText[0].description)}
                {introText && introText[1] && parse(introText[1].description)}
                {introText && introText[2] && parse(introText[2].description)}
              </div>
            </div>
          </div>
          <div className='last_update'>
            <div>
              <span>
                마지막 업데이트:
                {update && update.slice(0, 10).replace(/-/g, '.')}
              </span>
            </div>
          </div>
          <div className='test product_bottom_navigator'>
            <div>
              <Link href='/category/product'>
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={arrowLeft}
                  alt='mainImg'
                ></img>
              </Link>

              <span>see more products</span>
            </div>
          </div>
        </div>
        <GoToShop
          shopLink={
            links &&
            links
              .filter((item) => item.type == 'etc')
              .map((item) => {
                return item.url;
              })
          }
        ></GoToShop>
        <GoToTop scrollStepInPx='100' delayInMs='30.50'></GoToTop>
      </>
      <Footer></Footer>
    </>
  );
};

export default PageComponent;

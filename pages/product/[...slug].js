import Head from 'next/head';
import React, {
  Component,
  createRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import Router, { useRouter } from 'next/router';
import { observable, toJS, reaction } from 'mobx';
import { observer } from 'mobx-react';
import useScrollCount from '../../utils/useScrollCount';

import * as Page from '../../axios/_Page';
import * as Category from '../../axios/_Category';

import store from '../../common/store';
import Link from 'next/link';
import LogoBlack from '../../static/images/LogoBlack.png';
import Emblem from '../../static/images/emblem.png';
import arrowLeft from '../../static/images/arrowLeft.png';
import arrowRight from '../../static/images/arrowRight.png';

import { GoToTop, GoToShop, Footer, Map } from '../../components';

const imagePath07 = [
  '../static/images/07/07_9.png',
  '../static/images/07/07_20.jpg',
  '../static/images/07/07_22.jpg',
  '../static/images/07/07_23.jpg',
  '../static/images/07/07_4.gif',
  '../static/images/07/07_5.gif',
  '../static/images/07/07_6.gif',
  '../static/images/07/07_7.gif',
  '../static/images/07/07_24.png',
  '../static/images/07/07_16.gif',
  '../static/images/07/07_17.gif',
  '../static/images/07/07_18.gif',
  '../static/images/07/07_19.gif',
  '../static/images/07/07_11.jpg',
  '../static/images/07/07_3.png',
  '../static/images/07/07_1.png',
  '../static/images/07/07_2.png',
  '../static/images/07/07_10.png',
  '../static/images/07/07_12.gif',
  '../static/images/07/07_13.gif',
  '../static/images/07/07_14.gif',
  '../static/images/07/07_15.gif',
  '../static/images/07/07_8.jpg',
  '../static/images/07/07_21.png',
  '../static/images/07/score.png',
  '../static/images/temblem.png',
];

const PageComponent = ({ props }) => {
  const [loaded, setLoaded] = useState(false);
  const [pos, setPos] = useState(false);
  const [query, setQuery] = useState('');
  const [pageData, setPageData] = useState(null);
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

  const animatedItem = useScrollCount(80, 0, 1500);

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
    document.addEventListener('scroll', updateScroll);
  }, [router.query]);

  const scrollToRef = (ref) => {
    timeoutRef.current = setInterval(onScrollStep(ref), 3000);
  };

  
  async function fetchPageData() {
    var query = '';
    query = '?slug=' + 'product/' + slug;

    console.log("[fetchPageData] query")
    console.log(query)

    const req = { header: {}, data: {}, query: query };
    const result = await Page.getList(req);

    console.log("[fetchPageData] result")
    console.log(result)

  }

  
  async function fetchCategoryData() {
    var query = '';
    query = '';

    console.log("[fetchCategoryData] query")
    console.log(query)

    const req = { header: {}, data: {}, query: query };
    const result = await Category.getList(req);

    console.log("[fetchCategoryData] result")
    console.log(result)

  }


  if (store.pageSlug != slug) {
    store.pageSlug = slug;

    // fetchData();
  }

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000);
    fetchCategoryData();
    fetchPageData();
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
                <h1>
                  {router && router.query && router.query.slug
                    ? router.query.slug.toString().replace(/-/g, ' ')
                    : null}
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
                <li className='nav_item' onClick={() => scrollToRef(tecRef)}>
                  Technology
                </li>
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
                하나의 제품이 만들어지기 위해 필요한 모든 소재와 제조과정을
                파악하여 100% 투명성에 도달할 수 있도록 지속가능성을 실천합니다.
              </p>
            </div>
          </div>
          <div className='test traceability' ref={tracRef}>
            <div className='traceability_topimg'>
              {scrollPosition &&
              tracRef &&
              scrollPosition > tracRef.current.offsetTop ? (
                <img src={imagePath07[8]} alt='itemImg'></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={imagePath07[8]}
                  alt='itemImg'
                ></img>
              )}
            </div>
            <div>
              <div>
                <div id='loading'>
                  <div className='score'>
                    <div {...animatedItem} />%
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
                엄선하게 선별된 주요 소재와 제품에 사용되는 작은 부품까지
                해당되는 모든 소재에 대한 정보를 공유합니다.
              </p>
            </div>
          </div>
          <div className='test item' ref={topRef}>
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
              <p>
                빈티지 러너 라스트를 복학하여 스포티한 느낌을 줄이고 유럽인 신발
                사이즈를 한국인 발에 맞춰 보완한 라스트입니다. 아몬드 형태의
                앞코를 가졌으며 발등과 발볼이 넓게 나왔습니다. 표준 사이즈로 발
                뒤꿈치가 들리지 않게 끈을 잘 조여주시면 편안하게 신을 수
                있습니다.
              </p>
            </div>
          </div>
          <div className='category_desc'>
            <div>
              <span>소재</span>
            </div>
            <div>
              <p>
                엄선하게 선별된 주요 소재와 제품에 사용되는 작은 부품까지
                해당되는 모든 소재에 대한 정보를 공유합니다.
              </p>
            </div>
          </div>
          <div className='test material' ref={matRef}>
            <div className='material_column_small'>
              <div>
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop ? (
                    <img src={imagePath07[1]} alt='mainImg'></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={imagePath07[1]}
                      alt='mainImg'
                    ></img>
                  )}
                </div>
                <div>
                  <p>
                    lwg(leather working group) gold medal 수상한 이탈리아산
                    풀그레인 소가죽으로 나파가죽처럼 부드럽고 광택이 은은하게
                    있는 것이 특징입니다.
                  </p>
                  <p>
                    종류: 풀그레인 소가죽 풀카프 <br></br>태닝: 크롬 태닝
                    (이탈리아 베네토 비첸자) <br></br>마감: 세미아날린 <br></br>
                    원피: 유럽 두께: 1.0mm-1.2mm
                  </p>
                </div>
              </div>
              <div>
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop + 100 ? (
                    <img src={imagePath07[2]} alt='mainImg'></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={imagePath07[2]}
                      alt='mainImg'
                    ></img>
                  )}
                </div>
                <div>
                  <p>
                    lwg 인증된 이탈리아산 발수(water repellent) 가능한
                    스웨이드로 크러스트 원피를 하나씩 확인하며 정교하게 아날린
                    염색을 드럼통을 돌려서 일정하게 유지되는 색상과 품질을
                    만들어냅니다. 따로 어떠한 마감을 하지 않으며 자연스러운
                    가죽을 고집합니다.
                  </p>
                  <p>
                    종류: 크러스트 소가죽 <br></br>태닝: 크롬 태닝 (이탈리아
                    피사 산타 크로체)<br></br>마감: 없음<br></br> 원피: 프랑스와
                    네덜란드<br></br> 두께: 1.4mm-1.6mm
                  </p>
                </div>
              </div>
              <div>
                <div>
                  {scrollPosition &&
                  matRef &&
                  scrollPosition > matRef.current.offsetTop + 200 ? (
                    <img src={imagePath07[3]} alt='mainImg'></img>
                  ) : (
                    <img
                      style={{ filter: 'grayscale(100%)' }}
                      src={imagePath07[3]}
                      alt='mainImg'
                    ></img>
                  )}
                </div>
                <div>
                  <p>
                    진공 드라이 처리한 내츄럴 타입 가죽으로 통해 굉장히 부드럽고
                    흡수력이 뛰어나며 신을 수록 경년변화가 일어납니다.{' '}
                  </p>
                  <p>
                    종류: 풀그레인 소가죽<br></br> 태닝: 크롬 태닝 (이탈리아
                    마르케 페르모)<br></br> 마감: 세미 아날린<br></br> 원피:
                    파키스탄<br></br> 두께: 0.8mm-1.0mm
                  </p>
                </div>
              </div>
            </div>
            <div className='gif_column_small'>
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 300 ? (
                  <img src={imagePath07[4]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[4]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 400 ? (
                  <img src={imagePath07[5]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[5]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 500 ? (
                  <img src={imagePath07[6]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[6]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                matRef &&
                scrollPosition > matRef.current.offsetTop + 600 ? (
                  <img src={imagePath07[7]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[7]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
            </div>
          </div>
          <div className='category_desc'>
            <div>
              <span>아웃솔</span>
            </div>
            <div>
              <p>
                엄선하게 선별된 주요 소재와 제품에 사용되는 작은 부품까지
                해당되는 모든 소재에 대한 정보를 공유합니다.
              </p>
            </div>
          </div>
          <div className='test manufacturing' ref={outRef}>
            <div className='manufacturing_intro'>
              <div>
                <p>
                  50%이상 전력가동을 태양광 에너지로 가동시키고 있는 아웃솔 조립
                  공장입니다. eva를 물분사 기계로 자른 뒤 하루를 건조시킨 후
                  프로파일 기계에 넣어 신발라스트와 형태를 맞춥니다. 아웃솔과
                  함께 부착을 위한 안정화를 위하여 하루 더 건조시킨 후 다음날
                  아웃솔의 윗면과 측면을 갈아냅니다. 마지막으로 검수를 진행 후
                  신발 공장으로 보내집니다. <br></br>
                  <br></br>핸드메이드 클래식 러닝 아웃솔(포르투갈 펠게이라
                  페네코바) <br></br>스티렌부타디엔 고무로 아웃솔 제작<br></br>{' '}
                  두개 층의 eva 생산하여 재단 및 접착 후 미드솔과 아웃솔을 조립
                  <br></br>
                  <br></br>
                  [마지막 방문] 2020년 10월
                </p>
              </div>
              <div>
                {scrollPosition &&
                outRef &&
                scrollPosition > outRef.current.offsetTop ? (
                  <img src={imagePath07[13]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[13]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
            </div>
            <div className='manufacturing_gif'>
              <div>
                {scrollPosition &&
                outRef &&
                scrollPosition > outRef.current.offsetTop + 100 ? (
                  <img src={imagePath07[10]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[10]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                outRef &&
                scrollPosition > outRef.current.offsetTop + 200 ? (
                  <img src={imagePath07[11]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[11]}
                    alt='mainImg'
                  ></img>
                )}{' '}
              </div>
              <div>
                {scrollPosition &&
                outRef &&
                scrollPosition > outRef.current.offsetTop + 200 ? (
                  <img src={imagePath07[12]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[12]}
                    alt='mainImg'
                  ></img>
                )}{' '}
              </div>
              <div>
                {scrollPosition &&
                outRef &&
                scrollPosition > outRef.current.offsetTop + 300 ? (
                  <img src={imagePath07[9]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[9]}
                    alt='mainImg'
                  ></img>
                )}{' '}
              </div>
            </div>
          </div>
          <div className='category_desc'>
            <div>
              <span>기타소재</span>
            </div>
            <div>
              <p>
                엄선하게 선별된 주요 소재와 제품에 사용되는 작은 부품까지
                해당되는 모든 소재에 대한 정보를 공유합니다.
              </p>
            </div>
          </div>
          <div className='test sub_material' ref={subRef}>
            <div className='sub_material_img'>
              <div>
                {scrollPosition &&
                subRef &&
                scrollPosition > subRef.current.offsetTop ? (
                  <img src={imagePath07[22]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[22]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                subRef &&
                scrollPosition > subRef.current.offsetTop + 100 ? (
                  <img src={imagePath07[23]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[23]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
            </div>
            <div className='sub_material_intro'>
              <div>
                <p>
                  재활용된 섬유보드로(이탈리아) 조립(포르투갈) 블루 라텍스 폼
                  사용(스위스) 폴리프로펠린으로 주형된 인솔 오쏘틱을 최종
                  제조단계에서 인솔 쿠션 하단에 접착(대한민국) 폴리우레탄 폼을
                  사용(포르투갈) 100% 폴리에스터를 방적하여 재봉실로
                  생산(이탈리아) 수성 기반의 접착제로 사용(포르투갈) 재활용된
                  폴리에스테르로 제작(포르투갈) 100% 유기농 코튼 방적하여 끈으로
                  생산(포르투갈) 100% 사탕수수(콜롬비아)를 서울시 광진구에서
                  자연생분해가 되는 종이로 재가공하여 제작 100% 유기농 코튼으로
                  봉제하여 코튼 레이스 적용(포르투갈) 100% 재활용된 골판지와
                  카톤 종이로 제작(포르투갈)
                </p>
              </div>
            </div>
          </div>

          <div className='category_desc'>
            <div>
              <span>기술</span>
            </div>
            <div>
              <p>
                하지 생체 역학기술을 바탕으로 편안한 걸음이 되도록 개발합니다.
              </p>
            </div>
          </div>
          <div className='test technology' ref={tecRef}>
            <div className='technology_intro'>
              <div>
                <p>
                  그라더스가 만드는 ‘좋은 걸음을 위한 신발’은 모두 모회사인
                  바이오메카닉스의 하지 생체 역학 기술을 바탕으로 합니다.
                  (특허번호:10-2010-011986) 이를 기본으로 이탈리아의 마르곰사와
                  2015년 부터 독자적인 아웃솔과 인솔패드를 개발하여 제품에
                  적용하고 있으며 지속적으로 새로운 기술개발을 합니다.
                </p>
              </div>
              <div>
                <span>Go to biomechanics</span>
              </div>
            </div>
            <div className='technology_img'>
              <div>
                {scrollPosition &&
                tecRef &&
                scrollPosition > tecRef.current.offsetTop ? (
                  <img src={imagePath07[14]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[14]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                tecRef &&
                scrollPosition > tecRef.current.offsetTop + 100 ? (
                  <img src={imagePath07[16]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[16]}
                    alt='mainImg'
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
                시멘팅(cementing)공법. 소재부터 최종 신발에 이르는 모든
                제조단계를 보여줍니다.
              </p>
            </div>
          </div>
          <div className='test manufacturing' ref={manRef}>
            <div className='manufacturing_intro'>
              <div>
                <p>
                  지역 : 산토 아드리아 비젤라, 포르투갈(santo adrião vizela,
                  portugal) <br></br>설립연도 : 2005년 <br></br>
                  직원수 : 120명<br></br>
                  <br></br>아버지와 아들이 운영하는 회사로 한해 26만족의 신발을
                  생산합니다. 주로 북유럽 브랜드들과 협업하며 영국, 이탈리아,
                  독일 및 여러 유럽 국가에 수출합니다. 신발을 만들 때 가장 많이
                  소요되는 부분인 재단, 재봉, 저부, 조립, 마감 및 포장을 직접
                  제조시절에 방문하여 작업 환경을 확인하여 진행합니다.
                </p>
              </div>
              <div>
                <Map></Map>
              </div>
            </div>
            <div className='manufacturing_gif'>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 100 ? (
                  <img src={imagePath07[18]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[18]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 200 ? (
                  <img src={imagePath07[19]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[19]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 300 ? (
                  <img src={imagePath07[20]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[20]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
              <div>
                {scrollPosition &&
                manRef &&
                scrollPosition > manRef.current.offsetTop + 400 ? (
                  <img src={imagePath07[21]} alt='mainImg'></img>
                ) : (
                  <img
                    style={{ filter: 'grayscale(100%)' }}
                    src={imagePath07[21]}
                    alt='mainImg'
                  ></img>
                )}
              </div>
            </div>
          </div>
          <div className='category_desc'>
            <div>
              <span>추적가능성</span>
            </div>
            <div>
              <p>
                시멘팅(cementing)공법. 소재부터 최종 신발에 이르는 모든
                제조단계를 보여줍니다.
              </p>
            </div>
          </div>
          <div className='test introduction' ref={locRef}>
            <div>
              {scrollPosition &&
              locRef &&
              scrollPosition > locRef.current.offsetTop - 400 ? (
                <img src={imagePath07[25]} alt='mainImg'></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={imagePath07[25]}
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
                <p>
                  그라더스의 디자인은 개인의 기호를 위해 다양한 스타일을
                  만들어냄과 동시에 하입(hype)을 배제한 진실함을 추구합니다.
                  제품이 오래사용될 수 있는 좋은 품질을 지향하며 월드클라스
                  디자인을 모두에게 접근성있게 만들 것입니다. 제품이 만들어지는
                  과정에 대한 투명성은 hwmi(how we make it)의 본질이자
                  태도입니다.
                </p>
              </div>
            </div>
          </div>
          <div className='test bottom_navigator'>
            <div>
              <div>
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={arrowLeft}
                  alt='mainImg'
                ></img>
              </div>
              <div>previous</div>
            </div>
            <div>
              <div>next</div>
              <div>
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={arrowRight}
                  alt='mainImg'
                ></img>
              </div>
            </div>
          </div>
        </div>

        <GoToShop></GoToShop>
        <GoToTop scrollStepInPx='100' delayInMs='30.50'></GoToTop>
      </>
      <Footer></Footer>
    </>
  );
};

export default PageComponent;

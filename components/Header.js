import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import LogoExample from '../static/images/logo.png';
import LogoBlack from '../static/images/LogoBlack.png';
import Emblem from '../static/images/emblem.png';

import styled from 'styled-components';

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
];

import { SearchBar } from './index';

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
  //   background-color: #ffffef;
  background-color: #fff;
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
    padding-left: 1em;
  }

  & > div > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    height: 100%;

    & > div {
      width: 50%;
      border-right: 1px solid #888;
      111111111199*/011 01/9* :first-child {
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

  const timeoutRef = useRef(null);

  const topRef = useRef(null);
  const matRef = useRef(null);
  const manRef = useRef(null);
  const locRef = useRef(null);
  const tecRef = useRef(null);
  const tracRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    setPos(true);
  };

  const onScrollStep = (ref) => {
    if (window.pageYOffset === 0) {
      clearInterval(timeoutRef.current);
    }
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop + 150,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', updateScroll);
  });

  const scrollToRef = (ref) => {
    timeoutRef.current = setInterval(onScrollStep(ref), 3000);
  };

  return (
    <>
      <div className='index_header'>
        <div className='logo'>
          <img src={LogoExample}></img>
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
                <li className='nav_item' onClick={() => scrollToRef(tracRef)}>
                  Traceability
                </li>
                <li className='nav_item' onClick={() => scrollToRef(topRef)}>
                  Item
                </li>
                <li className='nav_item' onClick={() => scrollToRef(topRef)}>
                  Introduction
                </li>
                <li className='nav_item' onClick={() => scrollToRef(matRef)}>
                  Material
                </li>
                <li className='nav_item' onClick={() => scrollToRef(manRef)}>
                  Manufacturing
                </li>
                <li className='nav_item' onClick={() => scrollToRef(tecRef)}>
                  Technology
                </li>
                <li className='nav_item' onClick={() => scrollToRef(locRef)}>
                  Location
                </li>
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
            <div
              className={
                scrollPosition < 180
                  ? 'header_box before_scroll'
                  : 'header_box after_scroll'
              }
            >
              {open ? (
                <h1 onClick={() => setOpen(!open)}>How we make it</h1>
              ) : (
                <h1 onClick={() => setOpen(!open)}>
                  Balmoral 07 Suede/Leather Black
                </h1>
              )}
              <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
              </StyledBurger>
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
                  Item
                </li>
                <li className='nav_item' onClick={() => scrollToRef(matRef)}>
                  Material
                </li>
                <li className='nav_item' onClick={() => scrollToRef(manRef)}>
                  Manufacturing
                </li>
                <li className='nav_item' onClick={() => scrollToRef(tecRef)}>
                  Technology
                </li>
                <li className='nav_item' onClick={() => scrollToRef(locRef)}>
                  Location
                </li>
                <li className='contactright'>
                  <SearchBar></SearchBar>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='content_box'>
          <div className='test traceability' ref={tracRef}>
            <div className='traceability_topimg'>
              <img
                id='traceability_hiddenimg'
                src={imagePath07[8]}
                alt='itemImg'
              ></img>
              <div id='traceability_showimg' className='overlay'>
                <img src={imagePath07[8]} alt='itemImg'></img>
              </div>
            </div>
            <div>
              <div>
                <div id='loading'>
                  <span>80%</span>
                  <div className='left'>
                    <div className='fill'></div>
                  </div>
                  <div className='right'>
                    <div className='fill'></div>
                  </div>
                </div>
              </div>
              <div className='traceability_emblem'>
                <img src={Emblem} alt='emblemImg'></img>
              </div>
            </div>
          </div>
          <div className='test item' ref={topRef}>
            <div>
              <img src={imagePath07[0]} alt='mainImg'></img>
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
          <div className='test material' ref={matRef}>
            <div className='material_column_small'>
              <div>
                <div>
                  <img src={imagePath07[1]} alt='mainImg'></img>
                </div>
                <div>
                  <p>
                    lwg(leather working group) gold medal 수상한 이탈리아산
                    풀그레인 소가죽으로 나파가죽처럼 부드럽고 광택이 은은하게
                    있는 것이 특징입니다.
                  </p>
                  <p>
                    종류: 풀그레인 소가죽 풀카프 태닝: 크롬 태닝 (이탈리아
                    베네토 비첸자) 마감: 세미아날린 원피: 유럽 두께: 1.0mm-1.2mm
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <img src={imagePath07[2]} alt='mainImg'></img>
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
                  <img src={imagePath07[3]} alt='mainImg'></img>
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
                <img src={imagePath07[4]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[5]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[6]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[7]} alt='mainImg'></img>
              </div>
            </div>
          </div>
          <div className='test manufacturing' ref={manRef}>
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
                </p>
              </div>
              <div>
                <img src={imagePath07[13]} alt='mainImg'></img>
              </div>
            </div>
            <div className='manufacturing_gif'>
              <div>
                <img src={imagePath07[10]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[11]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[12]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[9]} alt='mainImg'></img>
              </div>
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
                <img src={imagePath07[14]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[15]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[16]} alt='mainImg'></img>
              </div>
            </div>
          </div>
          <div className='test manufacturing' ref={locRef}>
            <div className='manufacturing_intro'>
              <div>
                <p>
                  지역 <br></br>산토 아드리아 비젤라, 포르투갈(santo adrião
                  vizela, portugal) <br></br>설립연도 <br></br>2005년 <br></br>
                  직원수<br></br> 120명<br></br>
                  <br></br>아버지와 아들이 운영하는 회사로 한해 26만족의 신발을
                  생산합니다. 주로 북유럽 브랜드들과 협업하며 영국, 이탈리아,
                  독일 및 여러 유럽 국가에 수출합니다. 신발을 만들 때 가장 많이
                  소요되는 부분인 재단, 재봉, 저부, 조립, 마감 및 포장을 직접
                  제조시절에 방문하여 작업 환경을 확인하여 진행합니다.
                </p>
              </div>
              <div>
                <img src={imagePath07[17]} alt='mainImg'></img>
              </div>
            </div>
            <div className='manufacturing_gif'>
              <div>
                <img src={imagePath07[18]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[19]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[20]} alt='mainImg'></img>
              </div>
              <div>
                <img src={imagePath07[21]} alt='mainImg'></img>
              </div>
            </div>
          </div>
        </div>
      </>
      <style jsx='true' global='true' suppressHydrationWarning>
        {`
          .test {
            position: relative;
            height: 75vh;
            width: 100%;
            border-bottom: 1px solid #888;
            display: flex;
            flex-direction: row;
            overflow-y: scroll;
          }

          .test > div:first-child {
            border-right: 1px solid #888;
            border-left: 1px solid #888;
          }

          .test > div:last-child {
            border-right: 1px solid #888;
          }

          .test p {
            line-height: 1.8em;
            word-break: keep-all;
            margin-left: 1.5em;
            margin-right: 1.5em;
            margin-top: 2em;
            margin-bottom: 2em;
          }

          .manufacturing {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .manufacturing_gif {
            height: calc(75vh / 2);
            width: calc(100% - 2px);
            border-top: 1px solid #888;
            border-left: 1px solid #888;
            border-right: 1px solid #888;
          }

          .manufacturing_intro {
            height: calc(75vh / 2);
            width: calc(100% - 1px);
            display: flex;
            flex-direction: row;
          }

          .manufacturing_intro > div:first-child {
            height: 100%;
            width: 60%;
            border-right: 1px solid #888 !important;
          }

          .manufacturing_intro > div:last-child {
            height: 100%;
            width: 40%;
            border-right: 1px solid #888 !important;
          }

          .manufacturing_intro > div:last-child > img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }

          .manufacturing_gif {
            height: calc(75vh / 2);
            display: flex;
            flex-direction: row;
          }

          .manufacturing_gif > div {
            height: 100%;
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .manufacturing_gif > div > img {
            height: 98%;
            width: 98.5%;
            object-fit: cover;
          }

          .item div:first-child {
            width: calc(60% - 1px);
            display: flex;
            align-items: center;
          }

          .item div:first-child img {
            width: 100%;
          }

          .item div:last-child {
            width: calc(40% - 1px);
            position: relative;
            height: 100%;
          }

          .item div:last-child p {
            position: sticky;
            top: 0;
          }

          .traceability > div:first-child {
            width: calc(60% - 2px);
          }

          .traceability > div:last-child {
            width: calc(40% - 1px);
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .traceability > div:last-child > div {
            width: 100%;
          }

          .traceability > div:last-child > div:first-child {
            height: 70%;
            justify-content: center;
            align-items: center;
            display: flex;
          }

          .traceability_emblem {
            height: 30%;
            display: flex;
            border-top: 1px solid #888;
            justify-content: center;
            align-items: center;
            background-color: limegreen;
          }

          .traceability_topimg {
            height: 100%;
            position: relative;
          }

          .traceability_topimg > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            vertical-align: middle;
            display: block;
          }

          .overlay {
            position: absolute;
            top: 5%;
            bottom: 0;
            left: 15%;
            right: 0;
            overflow: hidden;
            height: 90%;
            width: 70%;
            border-radius: 50%;
            opacity: 0;
            transition: 2s ease;
          }

          .overlay img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }

          body:hover #traceability_hiddenimg {
            opacity: 0;
          }

          body:hover #traceability_showimg {
            opacity: 1;
          }

          .text {
            color: white;
            font-size: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            text-align: center;
          }

          .traceability div:last-child div:last-child img {
            height: 80%;
            object-fit: contain;
          }

          .material {
            width: 100%;
          }

          .material_column_small {
            width: calc(60% - 1px);
            display: flex;
          }

          .gif_column_small {
            width: calc(40% - 1px);
            height: 100%;
            display: flex;
            flex-flow: wrap;
          }

          .gif_column_small > div {
            width: 50%;
            height: calc(75vh / 2);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .gif_column_small > div img {
            width: 98%;
            height: 99%;
            object-fit: cover;
          }

          .material_column_small > div {
            width: calc(100% / 3);
            height: 100%;
            display: block;
            object-fit: cover;
            flex-flow: wrap;
            border-right: 1px solid #888;
          }

          .material_column_small > div:last-child {
            border: none;
          }

          .material_column_small div > div:first-child img {
            width: 100%;
            border: none !important;
          }

          .index_header {
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .index_header .logo {
            margin-top: 1em;
          }

          #topmenu {
            width: 100vw;
            list-style-type: none;
            margin: 0;
            padding: 0;
            position: sticky;
            top: 0;
            background-color: #fff;
          }

          li {
            list-style-type: none;
          }

          ul.topnav li a {
            display: inline-block;
            color: rgb(250, 250, 250);
            text-align: center;
            padding: 2px 16px;
            text-decoration: none;
            transition: 2s;
          }

          ul.topnav li.contactright {
            text-decoration: none;
            transition: 2s;
            position: absolute;
            right: 0;
          }

          button.icon {
            display: none;
          }

          .page_container {
            width: 100vw;
            overflow: scroll;
          }

          .page_navigation1 {
            width: 100vw;
            height: 50px;
            border-bottom: 1px solid #888;
          }

          .page_navigation1 > .header_box,
          .page_navigation2 > .header_box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          .before_scroll,
          .before_scroll h1 {
            font-family: 'GilSansMedium';
            font-size: 1em;
            transition: font-size 1s;
            transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
          }

          .after_scroll,
          .after_scroll > h1 {
            font-size: 1.25em;
            font-family: 'GilSansMedium';

            transition: font-size 1s;
            transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
          }

          .page_navigation1 > .header_box {
            overflow-x: hidden;
          }

          .page_navigation1 > .header_box > h1 {
            font-weight: lighter;
            margin: 0;
            width: 100vw;
          }

          .page_navigation2 {
            width: 100vw;
            height: 50px;
            border-bottom: 1px solid #888;
            animation: fade-in 1s ease-in-out;
          }

          .page_navigation2 > .header_box > .page_navigation_inner {
            width: 100%;
            display: flex;
            flex-direction: row;
            row-gap: 10px;
            overflow-x: scroll;
          }

          .page_navigation2 > .header_box > .page_navigation_inner > .nav_item {
            margin-right: 55px;
            font-family: 'GilSansMedium';
            font-weight: lighter;
          }

          #loading {
            width: 60%;
            height: 90%;
            margin: 0 auto;
            position: relative;
          }

          #loading > span {
            position: absolute;
            top: 45%;
            left: 40%;
            z-index: 10;
            font-size: 40px;
          }

          .fill,
          .dot span {
            background-color: #e8a648;
          }

          .fill {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 100%;
            clip: rect(0px, 50%, 100%, 0px);
          }

          .left .fill {
            z-index: 1;
            -webkit-animation: left 1s linear;
            -moz-animation: left 1s linear;
            animation: left 1s linear both;
          }

          .right {
            z-index: 3;
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            transform: rotate(180deg);
          }

          .right .fill {
            z-index: 3;
            -webkit-animation: right 2s linear;
            -moz-animation: right 2s linear;
            animation: right 2s linear both;
            -webkit-animation-delay: 2s;
            -moz-animation-delay: 2s;
            animation-delay: 2s;
          }

          .technology {
            width: 100%;
            height: 75v;
          }

          .technology_intro {
            width: calc(40% - 1px);
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .technology_intro > div {
            width: 100%;
            height: 50%;
          }

          .technology_intro > div:last-child {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #888;
          }

          .technology_intro > div:last-child span {
            border-bottom: 1px solid #888;
          }

          .technology_img {
            width: calc(60% - 1px);
            display: flex;
            flex-direction: row;
          }

          .technology_img > div {
            width: calc(100% / 3);
            height: 100%;
            border-right: 1px solid #888;
          }

          .technology_img > div:last-child {
            border-right: none;
          }

          .technology_img > div > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .location {
            width: 100%;
            height: 75v;
          }

          @media (max-width: 768px) {
            .page_navigation1 > .header_box > h1,
            .page_navigation2 {
              font-weight: lighter;
              font-size: 1em;
              font-family: 'GilSansMedium';
            }

            .before_scroll,
            .before_scroll h1 {
              font-size: 1em;
              transition: none;
              font-family: 'GilSansMedium';
            }

            .after_scroll,
            .after_scroll > h1 {
              font-size: 1em;
              transition: none;
            }

            .page_navigation2 > .header_box {
              width: 100vw;
              max-width: 100vw;
              overflow-x: auto;
            }

            .page_navigation1,
            .page_navigation2 {
              height: 40px;
              border-bottom: 1px solid #888;
            }

            ul.topnav.responsive {
            }

            ul.topnav.responsive li {
              float: none;
              display: inline;
            }

            ul.topnav.responsive li a {
              display: block;
              text-align: left;
            }

            .page_navigation1 > .header_box > h1 {
              margin-left: 1em;
            }

            ul.topnav li:first-child {
              margin-left: 1em;
            }

            ul.topnav li.contactright {
              display: none;
            }

            .traceability {
              display: flex;
              flex-direction: column;
            }

            .traceability > div:first-child {
              width: 100%;
            }

            .traceability > div:last-child {
              width: 100%;
            }

            .traceability > div:last-child > div {
              width: 100%;
            }

            .traceability > div:last-child > div:first-child {
              width: 100%;
              height: 40vh;
              border-top: 1px solid #888;
              justify-content: center;
              align-items: center;
              display: flex;
            }

            .traceability_emblem {
              width: 100%;
              padding-top: 1em;
              padding-bottom: 1em;
              display: flex;
              border-top: 1px solid #888;
              justify-content: center;
              align-items: center;
            }

            .traceability_topimg {
              height: 100%;
              position: relative;
            }

            .traceability_topimg > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              vertical-align: middle;
              display: block;
            }

            .overlay {
              position: absolute;
              top: 5%;
              bottom: 0;
              left: 25%;
              right: 0;
              height: 90%;
              width: 50%;
              border-radius: 50%;
              opacity: 0;
              transition: 2s ease;
              overflow: hidden;
            }

            .overlay img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            body:hover #traceability_hiddenimg {
              opacity: 0;
            }

            body:hover #traceability_showimg {
              opacity: 1;
            }

            .traceability div:last-child div:last-child img {
              height: 80%;
              object-fit: contain;
            }

            .test p {
              font-size: 0.75em;
            }

            .material {
              width: 100%;
            }

            .material_column_small {
              width: 100%;
              display: block;
            }

            .material_column_small > div {
              width: 100%;
              display: flex;
              flex-direction: column;
              flex-flow: no-wrap;
              object-fit: cover;
              border-right: none;
            }

            .gif_column_small {
              width: 100%;
              height: 100%;
              display: flex;
              flex-flow: wrap;
            }

            .gif_column_small > div {
              width: 50%;
              height: calc(75vh / 2);
            }

            .gif_column_small > div img {
              width: 98%;
              height: 98%;
              object-fit: cover;
            }

            .test {
              flex-direction: column;

              height: auto;
            }

            .test div:first-child {
              border: none;
            }

            .item div:first-child {
              width: calc(100% - 2px);
              display: flex;
              align-items: center;
            }

            .item div:last-child {
              width: 100%;
              border-top: 1px solid #888;
            }

            .manufacturing {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
            }

            .manufacturing_gif {
              height: auto;
              width: calc(100% - 2px);
              border-top: 1px solid #888;
              border-left: 1px solid #888;
              border-right: 1px solid #888;
            }

            .manufacturing_intro {
              height: 100%;
              width: calc(100% - 1px);
              display: flex;
              flex-direction: column;
            }

            .manufacturing_intro > div:first-child {
              height: 100%;
              width: 100%;
              border-right: none !important;
              order: 2;
            }

            .manufacturing_intro > div:last-child {
              width: 100%;
              border-right: 1px solid #888 !important;
              order: 1;
            }

            .manufacturing_intro > div:last-child > img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }

            .manufacturing_gif {
              width: 100%;
              height: 100%;
              display: flex;
              flex-flow: wrap;
              border: none;
            }

            .manufacturing_gif > div {
              width: 50%;
              height: calc(75vh / 2);
            }

            .manufacturing_gif > div > img {
              width: 98%;
              height: 98%;
              object-fit: cover;
            }

            .technology {
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: column;
            }

            .technology_intro {
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: column;
            }

            .technology_intro > div {
              width: 100%;
              height: auto;
            }

            .technology_intro > div:last-child {
              display: flex;
              justify-content: center;
              align-items: center;
              border-top: 1px solid #888;
              height: calc(75vh / 2);
            }

            .technology_intro > div:last-child span {
              border-bottom: 1px solid #888;
            }

            .technology_img {
              width: calc(100% + 1px);
              height: auto;
              display: flex;
              flex-direction: row;
              border-top: 1px solid #888;
            }

            .technology_img > div {
              width: calc(100% / 3);
              height: 100%;
              border-right: 1px solid #888 !important;
            }

            .technology_img > div:last-child {
              border-right: none;
            }

            .technology_img > div > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
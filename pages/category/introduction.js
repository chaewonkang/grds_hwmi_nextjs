import Head from 'next/head';
import React, {
  Component,
  createRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import { observable, toJS, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import jQuery from 'jquery';
import parse from 'html-react-parser';
import moment from 'moment';
import { Footer } from '../../components';

import * as Wine from '../../axios/Material';
// import Header from "../../components/Header";
import store from '../../common/store';
import Link from 'next/link';
import LogoExample from '../../static/images/trial_1.png';
import LogoBlack from '../../static/images/LogoBlack.png';
import Emblem from '../../static/images/emblem.png';

import { SearchBar, GoToTop } from '../../components';

import styled from 'styled-components';

const imagePath07 = [
  '../static/images/introduction/int_1.png',
  '../static/images/introduction/int_2.png',
  '../static/images/introduction/int_3.jpeg',
  '../static/images/introduction/int_4.jpeg',
  '../static/images/introduction/int_5.jpeg',
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
  z-index: 1000000;
  li {
    margin-bottom: 0.25em;
  }
`;

const Header = () => {
  const [pos, setPos] = useState(false);

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
    document.addEventListener('scroll', updateScroll);
  }, []);

  const scrollToRef = (ref) => {
    timeoutRef.current = setInterval(onScrollStep(ref), 3000);
  };

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
                {open ? (
                  <h1 onClick={() => setOpen(!open)}>How we make it</h1>
                ) : (
                  <h1 onClick={() => setOpen(!open)}>How we make it</h1>
                )}
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
                  src={imagePath07[1]}
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

          <div className='introduction_halfimg' ref={locRef}>
            <div>
              {scrollPosition &&
              subRef &&
              scrollPosition > subRef.current.offsetTop ? (
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
              {scrollPosition &&
              subRef &&
              scrollPosition > subRef.current.offsetTop ? (
                <img src={imagePath07[4]} alt='mainImg'></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={imagePath07[4]}
                  alt='mainImg'
                ></img>
              )}
            </div>
          </div>
          <div className='test introduction_fulltext' ref={subRef}>
            <div>
              <p>
                hwmi의 황금알(golden egg)은 이솝 우화중 ‘황금알을 낳는 거위’의
                모티브에서 시작되었습니다. 쉽게 황금알을 가지려는 농부는 인간의
                탐욕스러움을 나타내며 많은 것을 바랄수록 더 큰 것을 잃는 교훈을
                줍니다. 반대로 그라더스는 정직한 농부가 되어 거위가 좋은
                황금알을 낳을 수 있도록 노력하고자 합니다.
              </p>
            </div>
          </div>
          <div className='introduction_fullimg' ref={locRef}>
            <div>
              {scrollPosition &&
              subRef &&
              scrollPosition > subRef.current.offsetTop ? (
                <img src={imagePath07[2]} alt='mainImg'></img>
              ) : (
                <img
                  style={{ filter: 'grayscale(100%)' }}
                  src={imagePath07[2]}
                  alt='mainImg'
                ></img>
              )}
            </div>
          </div>
          <div className='test introduction_fulltext'>
            <div>
              <p>
                그라더스의 황금알은 제품에 사용되는 모든 소재와 제조과정에 대한
                100% 투명성을 상징합니다. 친환경 브랜드는 아니지만 좋은 제품을
                만들어 오래도록 사용할 수 있는 지속가능성을 실천할 것입니다.
              </p>
            </div>
          </div>
        </div>
        <GoToTop scrollStepInPx='100' delayInMs='30.50'></GoToTop>
      </>
    </>
  );
};

export default Header;

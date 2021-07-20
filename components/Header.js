import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import logoH from '../static/images/HWMI_logo.png';
import LogoBlack from '../static/images/LogoBlack.png';
import styled from 'styled-components';

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
  z-index: 100000;
  border-bottom: 1px solid #888;
  height: 45vh;
  background-color: #ffffef;
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

      :first-child {
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
      top: ref.current.offsetTop + 195,
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
    <header>
      <div className='index_header'>
        <div className='logo'>
          <img src={logoH}></img>
        </div>
        <div className='coverimage'>How we make it</div>
      </div>
      <div style={{ position: 'relative' }}>
        <StyledMenu open={open} setOpen={setOpen}>
          <div>
            <div>
              <SearchBar></SearchBar>
            </div>
            <div>
              <div>
                <li className='nav_item' onClick={() => scrollToRef(topRef)}>
                  All
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
                <li className='nav_item' onClick={() => scrollToRef(tracRef)}>
                  Traceability
                </li>
              </div>
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
                <li className='nav_item' onClick={() => scrollToRef(topRef)}>
                  All
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
                <li className='nav_item' onClick={() => scrollToRef(tracRef)}>
                  Traceability
                </li>
                <li className='contactright'>
                  <SearchBar></SearchBar>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='content_box'>
          <div className='test' ref={topRef}></div>
          <div className='test' ref={matRef}></div>
          <div className='test' ref={manRef}></div>
          <div className='test' ref={tecRef}></div>
          <div className='test' ref={locRef}></div>
          <div className='test' ref={tracRef}></div>
        </div>
      </div>
      <style jsx='true' global='true' suppressHydrationWarning>
        {`
          header {
            position: relative;
          }

          .test {
            height: 50vh;
            border-bottom: 1px solid #888;
          }

          .test:last-child {
            height: calc(100vh - 208px);
            border-bottom: none;
          }

          .index_header {
            width: 100vw;
            margin-top: 1em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 180px;
          }

          #topmenu {
            width: 100vw;
            list-style-type: none;
            margin: 0;
            padding: 0;
            position: sticky;
            top: 0;
            background-color: #ffffef;
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
            transition: 0.2s;
          }

          ul.topnav li.contactright {
            float: right;
            text-decoration: none;
            transition: 0.2s;
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
            font-size: 1em;
            transition: font-size 1s;
            transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
          }

          .after_scroll,
          .after_scroll > h1 {
            font-size: 1.25em;
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
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }

          .page_navigation2
            > .header_box
            > .page_navigation_inner::-webkit-scrollbar {
            display: none;
          }

          .page_navigation2 > .header_box > .page_navigation_inner > .nav_item {
            margin-right: 55px;
            font-family: 'NewParisSkyline';
            font-weight: lighter;
          }

          @media (max-width: 768px) {
            .page_navigation1 > .header_box > h1,
            .page_navigation2 {
              font-weight: lighter;
              font-size: 1em;
            }

            .before_scroll,
            .before_scroll h1 {
              font-size: 0.75em;
              transition: font-size 1s;
              transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
            }

            .after_scroll,
            .after_scroll > h1 {
              font-size: 1em;
              transition: font-size 1s;
              transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
            }

            .page_navigation2 > .header_box {
              width: 100vw;
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
          }
        `}
      </style>
    </header>
  );
};

export default Header;

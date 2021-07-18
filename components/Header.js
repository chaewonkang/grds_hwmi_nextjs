import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import logoH from '../static/images/HWMI_logo.png';

import { SearchBar } from './index';

const Header = () => {
  const [pos, setPos] = useState(false);
  const timeoutRef = useRef(null);
  const topRef = useRef(null);
  const matRef = useRef(null);
  const manRef = useRef(null);
  const locRef = useRef(null);
  const tecRef = useRef(null);
  const tracRef = useRef(null);

  const onScrollStep = (ref) => {
    if (window.pageYOffset === 0) {
      clearInterval(timeoutRef.current);
    }
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        setPos(true);
      } else {
        setPos(false);
      }
    });
  }, []);

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
      <div>
        <div className='page_container' id='topmenu'>
          <div className='page_navigation1'>
            <div className='header_box'>
              <h1>Balmoral 07 Suede/Leather Black</h1>
              <span className='icon'>☰</span>
            </div>
          </div>
          <div className='page_navigation2'>
            <div className='header_box'>
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
          <div className='test' ref={topRef}>
            All
          </div>
          <div className='test' ref={matRef}>
            Material
          </div>
          <div className='test' ref={manRef}>
            Manufacturing
          </div>
          <div className='test' ref={tecRef}>
            Technology
          </div>
          <div className='test' ref={locRef}>
            Location
          </div>
          <div className='test' ref={tracRef}>
            Traceability
          </div>
        </div>
      </div>
      <style jsx='true' global='true' suppressHydrationWarning>
        {`
          header {
            position: relative;
          }

          .test {
            height: 50vh;
          }

          .index_header {
            width: 100vw;
            margin-top: 1em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          #topmenu {
            width: 100vw;
            list-style-type: none;
            margin: 0;
            padding: 0;
            z-index: 3;
            position: sticky;
            top: 0;
            // background-color: #ffffef;
            background-color: rgba(254, 217, 11);
          }

          .small {
            font-size: 1px;
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

          span.icon {
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

          .page_navigation1 > .header_box > h1 {
            font-weight: lighter;
            font-size: 1.5em;
            margin: 0;
          }

          .page_navigation2 {
            width: 100vw;
            height: 50px;
            border-bottom: 1px solid #888;
            font-size: 1.25em;
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

            .page_navigation1 > .header_box,
            .page_navigation2 > .header_box {
              width: 100vw;
              overflow-x: auto;
            }

            .page_navigation1,
            .page_navigation2 {
              height: 40px;
              border-bottom: 1px solid #888;
            }

            span.icon {
              float: right;
              display: inline-block;
            }

            ul.topnav.responsive {
              position: relative;
            }
            ul.topnav.responsive li.icon {
              position: absolute;
              right: 0;
              top: 0;
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
          }
        `}
      </style>
    </header>
  );
};

export default Header;

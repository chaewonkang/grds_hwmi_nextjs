import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import logoH from '../static/images/HWMI_logo.png';

const Header = () => {
  const [pos, setPos] = useState(false);
  const timeoutRef = useRef(null);
  const myRef = useRef(null);

  const executeScroll = () => {
    scrollToRef(myRef);
  };

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
                <li className='nav_item' onClick={executeScroll}>
                  All
                </li>
                <li className='nav_item'>Material</li>
                <li className='nav_item'>Manufacturing</li>
                <li className='nav_item'>Technology</li>
                <li className='nav_item'>Location</li>
                <li className='nav_item'>Traceability</li>
                <li className='contactright'>
                  <span>Searchbar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='test' ref={myRef}>
          I wanna be seen
        </div>
      </div>
      <style jsx='true' global='true' suppressHydrationWarning>
        {`
          header {
            position: relative;
          }

          .test {
            height: 100vh;
          }

          .index_header {
            margin-top: 1em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          #topmenu {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
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
            font-size: 14px;
          }

          ul.topnav li.contactright {
            float: right;
            text-decoration: none;
            transition: 0.2s;
          }

          ul.topnav li:hover {
            background-color: rgb(100, 100, 100);
          }

          span.icon {
            display: none;
          }

          .page_container {
            width: 100vw;
            height: 100vh;
            overflow: scroll;
          }

          .page_navigation1 {
            width: 100vw;
            height: 60px;
            border-bottom: 1px solid #20201e;
          }

          .page_navigation1 > .header_box,
          .page_navigation2 > .header_box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          .page_navigation1 > .header_box > h1 {
            font-weight: lighter;
            font-size: 1.725em;
            margin: 0;
          }

          .page_navigation2 {
            width: 100vw;
            height: 60px;

            border-bottom: 1px solid #20201e;
            font-size: 1.5em;
          }

          .page_navigation2 > .header_box > .page_navigation_inner {
            width: 100%;
            height: 100%;
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

            .page_navigation1,
            .page_navigation2 {
              height: 40px;
              border-bottom: 1px solid #000;
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
          }
        `}
      </style>
    </header>
  );
};

export default Header;

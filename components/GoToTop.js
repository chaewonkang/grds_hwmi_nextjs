import React, { useState, useRef, useEffect } from 'react';
import { Throttle } from '../utils';
import TopArrow from '../static/images/GoToTop.png';

const GoToTop = ({ scrollStepInPx, delayInMs }) => {
  const timeoutRef = useRef(null);
  const [show, setShow] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [pos, setPos] = useState(false);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const show = pageYOffset !== 0 && deltaY >= 0;
    setShow(show);
    setPageY(pageYOffset);
  };

  const throttleScroll = Throttle(handleScroll, 50);

  useEffect(() => {
    if (typeof window !== 'undefined')
      document.addEventListener('scroll', throttleScroll);

    if (typeof window !== 'undefined') {
      document.addEventListener('scroll', () => {
        if (window.scrollY > 170) {
          setPos(true);
        } else {
          setPos(false);
        }
      });
    }

    return () => document.removeEventListener('scroll', throttleScroll);
  }, []);

  const onScrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(timeoutRef.current);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  };

  const scrollToTop = () => {
    timeoutRef.current = setInterval(onScrollStep, delayInMs);
  };

  return (
    <div className={show ? 'show btn_container' : 'btn_container'}>
      <div className='gototop_container' onClick={scrollToTop}>
        <div className='gototop_text'>
          <img src={TopArrow} alt='arrowtop'></img>
        </div>
      </div>
      <style jsx='true' global='true' suppressHydrationWarning>{`
        .gototop_container {
          position: fixed;
          bottom: 20px;
          width: 40px;
          height: 40px;
          border: 1px solid #000;
          background-color: #000;
          color: #fff;
          position: fixed;
          right: 1em;
          bottom: 20px;
          z-index: 1000000;
          display: grid;
          cursor: pointer;
        }

        .gototop_text {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .gototop_text img {
          width: 75%;
          height: auto;
        }

        .show {
          display: block;
          animation: fade-in 1.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default GoToTop;

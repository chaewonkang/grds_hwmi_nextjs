import React, { useState, useRef, useEffect } from 'react';
import { Throttle } from '../utils';
import ShopLogo from '../static/images/Cart.png';

const GoToShop = () => {
  const [show, setShow] = useState(false);
  const [pageY, setPageY] = useState(0);

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
    return () => {
      document.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  return (
    <div className={show ? 'show btn_container' : 'btn_container'}>
      <div className={show ? 'gotoshop_container' : 'gotoshop_container'}>
        <div className='gotoshop_text'>
          <a href='https://grds.com' target='_blank'>
            <img src={ShopLogo} alt='shoplogo'></img>
          </a>
        </div>
      </div>
      <style jsx='true' global='true' suppressHydrationWarning>{`
        .btn_container {
          display: none;
        }

        .gotoshop_container {
          width: 40px;
          height: 40px;
          border: 1px solid #000;
          background-color: #000;
          color: #fff;
          position: fixed;
          right: 1em;
          bottom: 70px;
          z-index: 1000000;
          display: grid;
          cursor: pointer;
        }

        .gotoshop_text {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .gotoshop_text a {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .gotoshop_text img {
          width: 75%;
        }

        .show {
          display: block;
          animation: fade-in 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default GoToShop;

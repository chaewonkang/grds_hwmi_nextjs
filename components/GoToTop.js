import React, { useState, useRef, useEffect } from 'react';

const GoToTop = ({ scrollStepInPx, delayInMs }) => {
  const [intervalId, setIntervalId] = useState(0);
  const [pos, setPos] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        setPos(true);
      } else {
        setPos(false);
      }
    });
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
    <>
      <div className='gototop_container' onClick={scrollToTop}>
        <div className='gototop_text'>top</div>
      </div>
      <style jsx>{`
        .gototop_container {
          position: fixed;
          bottom: 20px;
          width: 40px;
          height: 40px;
          border: 1px solid #000;
          background-color: #000;
          color: #fff;
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 9999999999999;
          display: grid;
          cursor: pointer;
        }

        .gototop_text {
          display: flex;
          justify-self: center;
          align-self: center;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default GoToTop;

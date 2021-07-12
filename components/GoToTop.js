import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const GoToTopContainer = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.toggleButtonTextColor};
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999999999999;
  display: grid;
  cursor: pointer;
`;

const GoToTopText = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  font-size: 14px;
`;

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
    <GoToTopContainer onClick={scrollToTop}>
      <GoToTopText>top</GoToTopText>
    </GoToTopContainer>
  );
};

export default GoToTop;

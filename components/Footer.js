import React from 'react';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='box'>
          <div className='expendable'>
            <h3 className='title'></h3>
            <p className='two-columns'></p>
            <div className='side'></div>
          </div>
          <div className='footer-links'>
            <div className='side'>
              <div className='credits'>2021 Ⓒ grds</div>
              <div className='links'>Design, Development by YinYang</div>
            </div>
          </div>
        </div>
      </footer>
      <style
            jsx="true"
            global="true"
            suppressHydrationWarning>{`
        footer .box {
          overflow: hidden;
          position: relative;
        }

        @media (min-width: 1024px) {
          footer .box {
            height: 311px;
          }
        }

        .two-columns {
          margin: 0;
          letter-spacing: -0.22px;
          padding: 20px 15px 0;
        }

        @media (min-width: 768px) {
          .two-columns {
            padding: 12px 0 0 2px;
            margin-right: -2px;
          }
        }

        @media (min-width: 1024px) {
          .two-columns {
            margin-bottom: 0;
            float: left;
            width: 60%;
            -webkit-column-count: 2;
            -moz-column-count: 2;
            column-count: 2;
            -webkit-column-gap: 20px;
            -moz-column-gap: 20px;
            column-gap: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;

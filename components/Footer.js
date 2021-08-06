import React from 'react';
import logoF from '../static/images/footer_logo.png';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='footer_container'>
          <div className='footer_box'>
            <div className='footer_content'>
              <div className='footer_logo_box'>
                <img src={logoF}></img>
              </div>
              <div className='footer_about'>
                <h3>how we make it</h3>
                <p>
                  그라더스가 사용하는 소재와 기술의 출처를 밝혀 투명하게 제품이
                  만들어지는 제조과정을 공개합니다.
                </p>
              </div>
              <div className='footer_connect'>
                <h3>connect with us</h3>
                <span>Instagram</span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <style jsx='true' global='true' suppressHydrationWarning>{`
        .footer_container {
          width: 100vw;
          max-width: 100vw;
          height: 20vh;
          position: relative;
          border-top: 1px solid #888;
        }

        .footer_box {
          max-width: 100vw;
          overflow-x: hidden;
          margin-top: 1.5em;
          margin-bottom: 15em;
        }

        .footer_content {
          display: flex;
          flex-direction: row;
          justify-content: center;
          max-width: 100vw;
          height: 100%;
          overflow-x: hidden;
        }

        .footer_content > div {
          padding: 1em;
          height: 70%;
        }

        .footer_logo_box {
          width: calc(100% / 6 * 2);
        }

        .footer_about {
          width: calc(100% / 6 * 2);
        }

        .footer_connect {
          width: calc(100% / 6 * 2);
          border-right: 1px solid #888;
        }

        .footer_content > div > h3 {
          max-width: 100vw;
          font-size: 1em;
          font-weight: lighter;
          margin-top: 0;
        }

        .footer_logo_box > img {
          height: 100%;
        }

        .footer_content > div > p {
          font-size: 0.75em;
          line-height: 1.8em;
          word-break: keep-all;
        }

        @media (max-width: 768px) {
          .footer_container {
            width: 100vw;
            max-width: 100vw;
            height: 20vh;
            position: relative;
            border-top: 1px solid #888;
            transition: height 1s;
            transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
          }

          .footer_box {
            height: 20vh;
            margin-top: 0;
          }

          .footer_logo_box,
          .footer_about,
          .footer_connect {
            height: 100%;
          }

          .footer_content {
            position: sticky;
            top: 0;
            display: flex;
            flex-direction: row;
            height: 100%;
          }

          .footer_logo_box > img {
            height: 100%;
          }

          .footer_content > div {
          }

          .footer_connect {
            border-right: none;
          }

          .footer_content > div > h3 {
            font-size: 0.725em;
            font-weight: lighter;
          }

          .footer_content > div > p {
            font-size: 0.6em;
            line-height: 1.8em;
            word-break: keep-all;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;

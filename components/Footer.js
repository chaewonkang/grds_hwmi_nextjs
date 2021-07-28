import React from 'react';
import logoF from '../static/images/trial_1.png';

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
              <div>
                <h3>How we made it</h3>
                <p>
                  그라더스가 사용하는 소재와 기술의 출처를 밝혀 투명하게 제품이
                  만들어지는 제조과정을 공개합니다. 엄선된 주요 소재와 제품에
                  사용되는 작은 부품까지 해당되는 모든 소재에 대한 정보를
                  공유합니다. 소재부터 최종 신발에 이르는 모든 제조단계를
                  보여줍니다.
                </p>
              </div>
              <div>
                <h3>Connect with us</h3>
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
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          max-width: 100vw;
          overflow-x: hidden;
        }

        .footer_content > div {
          padding: 1em;
        }

        .footer_content > div > h3 {
          max-width: 100vw;
          font-size: 1em;
          font-weight: lighter;
          margin-top: 0;
        }

        .footer_logo_box > img {
          width: 20%;
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

          .footer_container:hover {
            height: 40vh;
          }

          .footer_content {
            position: sticky;
            top: 0;
            display: flex;
            flex-direction: column;
          }

          .footer_logo_box > img {
            height: 10%;
          }

          .footer_content > div {
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

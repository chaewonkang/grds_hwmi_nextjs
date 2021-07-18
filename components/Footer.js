import React from 'react';
import logoF from '../static/images/HWMI_logo.png';

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
          position: relative;
          border-top: 1px solid #888;
        }

        .footer_content {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .footer_content > div {
          width: 33%;
        }

        .footer_content > div > h3 {
          font-size: 1em;
          font-weight: lighter;
          margin-top: 0;
        }

        .footer_logo_box > img {
          height: 50%;
        }

        .footer_content > div > p {
          font-size: 0.75em;
          line-height: 1.8em;
          word-break: keep-all;
        }

        @media (max-width: 768px) {
          .footer_content {
            display: flex;
            flex-direction: column;
          }

          .footer_logo_box > img {
            height: 30%;
          }

          .footer_content > div {
            width: 100%;
          }

          .footer_content > div > h3 {
            font-size: 0.725em;
            font-weight: lighter;
          }

          .footer_content > div > p {
            font-size: 0.6em;
            line-height: 1.8em;
            word-break: keep-all;
            width: 100vw;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;

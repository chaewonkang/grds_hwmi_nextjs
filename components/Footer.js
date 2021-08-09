import React from 'react';
import logoF from '../static/images/footer_logo.png';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='footer_container'>
          <div className='footer_box'>
            <div className='footer_info_box'>
              <div className='footer_content'>
                <div className='footer_logo_box'>
                  <img src={logoF}></img>
                </div>
                <div className='footer_about'>
                  <h3>how we make it</h3>
                  <p>
                    그라더스가 사용하는 소재와 기술의 출처를 밝혀 투명하게
                    제품이 만들어지는 제조과정을 공개합니다.
                  </p>
                </div>
                <div className='footer_connect'>
                  <h3>connect with us</h3>
                  <div>
                    <a
                      href='https://instagram.com/grds_official'
                      target='_blank'
                    >
                      <span>instagram</span>
                    </a>
                    <a href='https://grds.com/index.html' target='_blank'>
                      <span>shop</span>
                    </a>
                    <a href='mailto:info@grds.com'>
                      <span>email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='footer_credit_box'>
              <span>Copyright Ⓒ All rights reserved 2021 grds.com</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

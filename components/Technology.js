import React from 'react';
import Link from 'next/link';

const Technology = ({ image }) => {
  return (
    <div className='technology_module'>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <Link href='/product/balmoral-07-suede-leather-black'>
          <span>upper leather / balmoral 07 black</span>
        </Link>
      </div>
    </div>
  );
};

export default Technology;

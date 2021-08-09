import React from 'react';
import Link from 'next/link';

const imagePath = [
  '../static/images/07/07_9.png',
  '../static/images/temblem.png',
];

const Product = () => {
  return (
    <div className='product_module'>
      <div>
        <img src={imagePath[0]}></img>
      </div>
      <div>
        <Link href='/product/balmoral-07-leather-suede-black'>
          <span>balmoral 07 leather/suded black</span>
        </Link>
      </div>
    </div>
  );
};

export default Product;

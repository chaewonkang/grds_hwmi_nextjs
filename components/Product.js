import React from 'react';
import Link from 'next/link';

const imagePath = [
  '../static/images/07/07_9.png',
  '../static/images/temblem.png',
];

const Product = ({ image, title }) => {
  return (
    <div className='product_module'>
      <div>
        <Link href={`/product/${title}`}>
          <img src={image}></img>
        </Link>
      </div>
      <div>
        <Link href={`/product/${title}`}>
          <span>{title && title.replace(/-/g, ' ')}</span>
        </Link>
      </div>
    </div>
  );
};

export default Product;

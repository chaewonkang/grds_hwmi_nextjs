import React from 'react';
import Link from 'next/link';

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

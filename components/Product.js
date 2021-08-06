import React from 'react';

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
        <span>balmoral 07 leather/suded black</span>
      </div>
    </div>
  );
};

export default Product;

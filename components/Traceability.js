import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import useScrollCount from '../utils/useScrollCount';

const imagePath = ['../static/images/temblem.png'];

const Traceability = ({ score, title, image }) => {
  const animatedItem = useScrollCount(parseInt(score), 0, 3000);

  return (
    <div className='traceability_module'>
      <div>
        <Link href={`/product/${title}`}>
          <img src={image}></img>
        </Link>
      </div>
      <div>
        <div>
          <img src={imagePath[0]}></img>
        </div>
        <div>
          <div>
            {score && <span {...animatedItem}></span>}
            <span>%</span>
          </div>
          <div>
            <Link href={`/product/${title}`}>
              <a title='About Page'>
                <span>{title && title.replace(/-/g, ' ')}</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traceability;

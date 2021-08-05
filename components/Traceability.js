import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

const imagePath = [
  '../static/images/07/07_24.png',
  '../static/images/temblem.png',
];

const Traceability = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (router && router.query && router.query.slug) {
      setQuery(router.query.slug);
    }
    console.log(router.query.slug);
  }, [router.query]);
  return (
    <div className='traceability_module'>
      <div>
        <img src={imagePath[0]}></img>
      </div>
      <div>
        <div>
          <img src={imagePath[1]}></img>
        </div>
        <div>
          <div>
            <span>80%</span>
          </div>
          <div>
            <Link href='/product/balmoral-07-suede-leather-black'>
              <a title='About Page'>
                <span>
                  Balmoral 07 <br></br>Leather/Suede Black
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traceability;

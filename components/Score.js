import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import useScrollCount from '../utils/useScrollCount';

const Score = ({ score }) => {
  const animatedItem = useScrollCount(parseInt(score), 0, 3000);

  return <div {...animatedItem}></div>;
};

export default Score;

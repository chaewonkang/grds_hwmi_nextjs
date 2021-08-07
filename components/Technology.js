import React from 'react';
import useScrollCount from '../utils/useScrollCount';

const Technology = ({ image }) => {
  return (
    <div className='material_module'>
      <div>
        <img src={image}></img>
      </div>
    </div>
  );
};

export default Technology;

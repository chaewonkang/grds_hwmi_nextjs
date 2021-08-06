import React from 'react';

const Material = ({ image }) => {
  return (
    <div className='material_module'>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <span>upper leather / balmoral 07 black</span>
      </div>
    </div>
  );
};

export default Material;

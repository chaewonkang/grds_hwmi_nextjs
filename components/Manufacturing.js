import React from 'react';

const Manufacturing = ({ image }) => {
  return (
    <div className='manufacturing_module'>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <span>Chivitanova Factory</span>
      </div>
    </div>
  );
};

export default Manufacturing;

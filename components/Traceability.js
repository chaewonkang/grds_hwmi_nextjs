import React from 'react';

const imagePath = [
  '../static/images/07/07_24.png',
  '../static/images/temblem.png',
];

const Traceability = () => {
  return (
    <div className='traceability_module'>
      <div>
        <div>
          <span>traceability</span>
        </div>
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
            <span>
              Balmoral 07 <br></br>Leather/Suede Black
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traceability;

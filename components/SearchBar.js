import React from 'react';

const SearchBar = () => {
  return (
    <div className='input_background'>
      <input type='text' placeholder='검색'></input>
      <style jsx='true' global='true' suppressHydrationWarning>
        {`
          .input_background {
            display: flex;
            justify-content: center;
          }

          .input_background input {
            -webkit-text-fill-color: rgba(128, 128, 128, 0.5);
            font-size: 11px;
            position: relative;
            border-radius: 0;
            z-index: 2;
            background-color: #edeee2;
            height: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default SearchBar;

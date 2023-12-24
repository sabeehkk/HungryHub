import React from 'react'

function Button({value, onClick, className}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div>
      <button
            type="submit"
            className={`bg-cherry-Red text-white py-2 px-10 rounded-sm focus:outline-none focus:ring focus:ring-indigo-200 ${className}`}
            onClick={handleClick}>
            {value}
          </button>
    </div>
  )
},
const categoryNames = catName.split(',');


export default Button
import React, { useState } from 'react';

const StarRating = ({ totalStars, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (star) => {
    setRating(star);
    onRatingChange(star);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          className='text-yellow cursor-pointer'
        >
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;

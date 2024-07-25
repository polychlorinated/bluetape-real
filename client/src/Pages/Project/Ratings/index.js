import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Ratings = ({ size, half, setRatings }) => {
  return (
    <div>
      {/* <h1>First Example</h1>
      <h4>Use your own elements as icons</h4>
      <ReactStars
        size={50}
        onChange={(newRating) => {
        }}
        emptyIcon={<i className="far fa-star" />}
        halfIcon={<i className="fa fa-star-half-alt" />}
        filledIcon={<i className="fa fa-star" />}
      />
      <h1>Second Example</h1> */}
      <ReactStars
        size={size}
        isHalf={half}
        activeColor="#0747A6"
        onChange={(newRating) => {
          setRatings(newRating);
        }}
      />
    </div>
  );
};

export default Ratings;

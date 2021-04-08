const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    i <= rating
      ? stars.push(<i key={i} className='fas fa-star text-warning'></i>)
      : !Number.isInteger(rating) && i === Math.ceil(rating)
      ? stars.push(
          <i key={i} className='fas fa-star-half-alt text-warning'></i>
        )
      : stars.push(<i key={i} className='far fa-star text-warning'></i>);
  }

  return <>{stars}</>;
};

export default StarRating;

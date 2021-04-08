import { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState('');
  const [rating, setRating] = useState('Rating');
  const [review, setReview] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    await RestaurantFinder.post(`/${id}/add-review`, {
      name,
      review,
      rating
    });

    history.push('restaurants/0');
    history.push(location.pathname);
  };

  return (
    <div className='mb-2'>
      <form>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              id='name'
              placeholder='Your Name'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              value={rating}
              onChange={e => setRating(e.target.value)}
              id='rating'
              className='custom-select'
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='review'>Review</label>
          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            id='review'
            placeholder='Review'
            className='form-control'
          />
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;

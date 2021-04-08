import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const Update = () => {
  const { id } = useParams();
  let history = useHistory();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();

    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange
    });
    history.push('/');
  };

  return (
    <>
      <h1 className='text-center'>Update Restaurant</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            id='name'
            className='form-control'
            type='text'
            placeholder='Restaurant Name'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            id='location'
            className='form-control'
            type='text'
            placeholder='Restaurant Location'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <select
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            id='price_range'
            className='custom-select'
          >
            <option disabled>Price Range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>
        <button onClick={handleSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
    </>
  );
};

export default Update;

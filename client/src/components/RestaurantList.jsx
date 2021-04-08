import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantsContext } from '../contexts/RestaurantsContext';

const RestaurantList = () => {
  const { restaurants, setRestaurants, deleteRestaurant } = useContext(
    RestaurantsContext
  );
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get('/');
      setRestaurants(response.data.data.restaurants);
    };

    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (event, id) => {
    event.stopPropagation();
    await RestaurantFinder.delete(`/${id}`);
    deleteRestaurant(id);
  };

  const handleUpdate = (event, id) => {
    event.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleSelect = id => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map(restaurant => (
              <tr
                onClick={() => handleSelect(restaurant.id)}
                key={restaurant.id}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>Ratings</td>
                <td>
                  <button
                    onClick={e => handleUpdate(e, restaurant.id)}
                    className='btn btn-warning'
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={e => handleDelete(e, restaurant.id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;

import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../contexts/RestaurantsContext';

const Restaurant = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data.restaurant);
    };

    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='text-center display-1'>{selectedRestaurant.name}</h1>

          {selectedRestaurant.reviews.length > 0 && (
            <div className='mt-3'>
              <div className='text-center text-warning'>
                <StarRating
                  rating={
                    selectedRestaurant.reviews
                      .map(review => review.rating)
                      .reduce((acc, cur) => acc + cur) /
                    selectedRestaurant.reviews.length
                  }
                />
                ({selectedRestaurant.reviews.length})
              </div>
              <div className='mt-3'>
                <Reviews reviews={selectedRestaurant.reviews} />
              </div>
            </div>
          )}

          <AddReview />
        </>
      )}
    </div>
  );
};

export default Restaurant;

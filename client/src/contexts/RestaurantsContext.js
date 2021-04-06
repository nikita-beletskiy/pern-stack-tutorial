import { useState, createContext } from 'react';

export const RestaurantsContext = createContext();

const RestaurantsContextProvider = props => {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;

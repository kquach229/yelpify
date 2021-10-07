import React, { useState, createContext } from 'react';

// create restaurants context
export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
  // Create the state hooks for restaurants
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Create function to render restaurant without page reload. We take the array of existing
  // restaurants and adding one restaurant to it
  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant])
  }

  return (
    // Restaurant provider which passes down the state, setMethod, and addRestaurant function
    <RestaurantsContext.Provider value={{ restaurants , setRestaurants, selectedRestaurant, setSelectedRestaurant, addRestaurant}}>
      {props.children}
    </RestaurantsContext.Provider>
  )
}
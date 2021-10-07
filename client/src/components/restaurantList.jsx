import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import RestaurantFinder from "../apis/restaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <div className="list-group">
      <table className="table">
        <thead>
          <tr className="bg-secondary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-dark text-primary">
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  key={restaurant.id}
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{"reviews"}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;

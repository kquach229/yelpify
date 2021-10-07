import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/restaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const { addRestaurant } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              type="text"
              className="form-control"
              placeholder="name"
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              value={location}
              type="text"
              className="form-control"
              placeholder="location"
              onChange={(e) => setlocation(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              className="custom-select my-1 mr-sm-2"
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;

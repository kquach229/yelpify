import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import restaurantFinder from "../apis/restaurantFinder";
import AddReview from "../components/addReview";
import Reviews from "../components/reviews";
import StarRating from "../components/starRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <div className="mt-3">
            <Reviews />
            <AddReview />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;

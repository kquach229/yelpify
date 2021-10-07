import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/home";
import RestaurantDetailPage from "./routes/restaurantDetailPage";
import UpdatePage from "./routes/updatePage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/restaurants/:id"
            component={RestaurantDetailPage}
          />
          <Route exact path="/restaurants/:id/update" component={UpdatePage} />
        </Switch>
      </Router>
    </RestaurantsContextProvider>
  );
};

export default App;

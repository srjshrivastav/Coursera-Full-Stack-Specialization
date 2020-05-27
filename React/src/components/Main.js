import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./menu";
import { DISHES } from "../shared/dishes";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import About from "./Aboutcomponent";
import { LEADERS } from "../shared/leaders";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  handleClick = (dishId) => {
    if (this.state.selectedDish !== dishId) {
      this.setState({ selectedDish: dishId });
    } else {
      this.setState({ selectedDish: null });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route path="/home" component={Home} />
            <Route
              exact
              path="/menu"
              component={() => (
                <Menu
                  dishes={this.state.dishes}
                  onClick={this.handleClick}
                  selectedDish={this.state.selectedDish}
                />
              )}
            />
            <Route
              path="/aboutus"
              component={() => <About leaders={LEADERS} />}
            />
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./menu";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import About from "./Aboutcomponent";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { COMMENTS } from "../shared/comments";
import { DISHES } from "../shared/dishes";
import Contact from "./Contact";
import DishDetail from "./DishDetailComponent";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
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
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };
    return (
      <div>
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route path="/home" component={HomePage} />
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
            <Route path="/contactus" component={Contact} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./menu";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Home from "./Home";
import About from "./Aboutcomponent";
import { LEADERS } from "../shared/leaders";
import Contact from "./Contact";
import DishDetail from "./DishDetailComponent";
import { connect } from "react-redux";
import { addComment } from "../redux/ActionCreators";

class Main extends React.Component {
  render() {
    const { dishes, comments, promotions, leaders } = this.props;
    const HomePage = () => {
      return (
        <Home
          dish={dishes.filter((dish) => dish.featured)[0]}
          promotion={promotions.filter((promo) => promo.featured)[0]}
          leader={leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
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
              component={() => <Menu dishes={dishes} />}
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

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

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
import {
  addComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    console.log(this.props);
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
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
              component={() => (
                <Menu
                  dishes={this.props.dishes.dishes}
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                />
              )}
            />
            <Route
              path="/aboutus"
              component={() => <About leaders={LEADERS} />}
            />

            <Route
              exact
              path="/contactus"
              component={() => (
                <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
              )}
            />
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
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardBody,
  CardText,
} from "reactstrap";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }
  handleClick = (dish) => {
    if (this.state.selectedDish !== dish) {
      this.setState({ selectedDish: dish });
    } else {
      this.setState({ selectedDish: null });
    }
  };

  renderDish(dish) {
    if (dish) {
      const { comments } = dish;
      return (
        <div className="row">
          <div className="col-12 col-sm-5 m-1">
            <Card>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>
                  <h4>{dish.name}</h4>
                </CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-sm-5 m-1">
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id}>
                <div>
                  <p style={{ fontSize: 18 }}>{comment.comment}</p>
                  <p style={{ fontSize: 18 }}>
                    --{comment.author}, {new Date(comment.date).toDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1 mt-5">
          <Card onClick={() => this.handleClick(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle heading="true">{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container mt-4">
        <div className="row">{menu}</div>
        <div>{this.renderDish(this.state.selectedDish)}</div>
      </div>
    );
  }
}
export default Menu;

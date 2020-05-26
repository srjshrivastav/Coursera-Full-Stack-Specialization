import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody } from "reactstrap";

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

  render() {
    const { selectedDish } = this.state;
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1 mt-5">
          <Card onClick={() => this.handleClick(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle heading="true">{dish.name}</CardTitle>
            </CardImgOverlay>
            {selectedDish ? (
              selectedDish.name === dish.name ? (
                <CardBody>{dish.description}</CardBody>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}
          </Card>
        </div>
      );
    });

    return (
      <div className="container mt-4">
        <div className="row">{menu}</div>
      </div>
    );
  }
}
export default Menu;

import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import DishDetail from "./DishDetailComponent";

function Menu(props) {
  const { dishes, onClick, selectedDish } = props;

  const menu = dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <Card onClick={() => onClick(dish.id)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle heading="true">{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{menu}</div>
      {selectedDish !== null ? (
        <DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Menu;

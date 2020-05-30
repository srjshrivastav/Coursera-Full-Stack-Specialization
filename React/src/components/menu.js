import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

function Menu(props) {
  const { dishes } = props;
  const { isLoading, errMess } = dishes;
  console.log(isLoading, errMess);

  const menu = dishes.dishes.map((dish) => {
    if (isLoading) {
      {
        console.log("Loading");
      }
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{errMess}</h4>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Link to={`/menu/${dish.id}`}>
            <Card>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                <CardTitle heading="true">{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
      );
    }
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
}
export default Menu;

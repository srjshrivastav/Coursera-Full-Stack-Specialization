import React from "react";
import {
  CardImg,
  Card,
  CardBody,
  CardTitle,
  CardText,
  BreadcrumbItem,
  Breadcrumb,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function DishDetail(props) {
  const { dish, comments } = props;
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
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
                  --{comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

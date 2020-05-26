import React from "react";
import { CardImg, Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function DishDetail(props) {
  const { dish } = props;
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
}

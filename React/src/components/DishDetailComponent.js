import React from "react";
import {
  CardImg,
  Card,
  CardBody,
  CardTitle,
  CardText,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Col,
  Label,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Errors, Control, LocalForm } from "react-redux-form";

export default class DishDetail extends React.Component {
  state = {
    showCommentModal: false,
  };
  handleToggle = () => {
    this.setState((state) => ({ showCommentModal: !state.showCommentModal }));
  };
  render() {
    const { dish, comments } = this.props;
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    return (
      <div>
        <Modal
          isOpen={this.state.showCommentModal}
          toggle={() => this.handleToggle()}
        >
          <ModalHeader toggle={() => this.handleToggle()}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm>
              <Row className="form-group">
                <Col md={12}>
                  <Label>Rating</Label>
                  <Control.select
                    type="select"
                    model="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Label>Your Name</Label>
                  <Control.text
                    type="text"
                    placeholder="Your Name"
                    model="name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  ></Control.text>
                  <Errors
                    className="text-danger"
                    model="name"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Label>Comment</Label>
                  <Input type="textarea" model="comment" rows="5"></Input>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
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
            <Button outline onClick={() => this.handleToggle()}>
              <span className="fa fa-pencil"></span> Submit Comment
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

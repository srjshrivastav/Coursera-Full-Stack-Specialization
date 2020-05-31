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
  Col,
  Label,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { Errors, Control, LocalForm } from "react-redux-form";

export default class DishDetail extends React.Component {
  state = {
    showCommentModal: false,
  };
  handleToggle = () => {
    this.setState((state) => ({ showCommentModal: !state.showCommentModal }));
  };

  handleSubmit(values) {
    this.props.addComment(
      this.props.dish.id,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    const { dish, comments } = this.props;
    console.log(this.props);
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.dish != null) {
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
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Col md={12}>
                    <Label>Rating</Label>
                    <Control.select
                      type="select"
                      model=".rating"
                      className="form-control"
                      defaultValue="1"
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
                      model=".author"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    ></Control.text>
                    <Errors
                      className="text-danger"
                      model=".author"
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
                    <Control.textarea
                      model=".comment"
                      rows="5"
                      className="form-control"
                    ></Control.textarea>
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
}

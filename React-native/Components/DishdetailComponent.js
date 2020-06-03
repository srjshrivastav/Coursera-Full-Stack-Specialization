import React from "react";
import { Text, View, ScrollView, Modal, Button } from "react-native";
import { Card, Icon, Input, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

function RenderComments(props) {
  const comments = props.comments;

  return (
    <Card title="Comments">
      {comments.map((comment) => (
        <View key={comment.id} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{comment.comment}</Text>
          <Rating
            readonly
            startingValue={comment.rating}
            style={{ alignItems: "flex-start" }}
            imageSize={15}
            st
          />
          <Text style={{ fontSize: 12 }}>
            {"-- " + comment.author + ", " + comment.date}{" "}
          </Text>
        </View>
      ))}
    </Card>
  );
}

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already favorite") : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.comment()}
          />
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: "",
      comment: "",
      rating: 5,
    };
  }
  ratingCompleted = (rating) => {
    this.setState({ rating });
  };

  handleAuthorInput = (author) => {
    this.setState({ author });
  };

  handleCommentInput = (comment) => {
    this.setState({ comment });
  };
  toggleModal() {
    console.log(this.state);
    this.setState({ showModal: !this.state.showModal });
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  handleComment() {
    const { rating, author, comment } = this.state;
    const dishId = this.props.dishId;
    console.log(this.state);

    this.toggleModal();
    this.props.postComment(dishId, rating, author, comment);
  }
  resetForm() {
    this.setState({
      showModal: false,
      author: "",
      comment: "",
      rating: 5,
    });
  }
  render() {
    const { dishes, comments, dishId } = this.props;
    return (
      <ScrollView>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <Rating
            showRating
            startingValue={this.state.rating}
            style={{ paddingVertical: 10 }}
            imageSize={30}
            onFinishRating={(value) => this.ratingCompleted(value)}
          />
          <Input
            placeholder="Author"
            onChangeText={(text) => this.handleAuthorInput(text)}
            leftIcon={
              <Icon type="font-awesome" name="user-o" size={20} color="black" />
            }
          ></Input>
          <Input
            leftIcon={
              <Icon
                type="font-awesome"
                name="comment-o"
                size={20}
                color="black"
              />
            }
            placeholder="Comment"
            onChangeText={(text) => this.handleCommentInput(text)}
          ></Input>
          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              raised
              color="#512DA8"
              onPress={() => {
                this.handleComment();
                this.resetForm();
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              title="Cancel"
              raised
              color="gray"
              onPress={() => this.toggleModal()}
            />
          </View>
        </Modal>
        <RenderDish
          dish={dishes.dishes[dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          comment={() => this.toggleModal()}
        />
        <RenderComments
          comments={comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, { route }) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    dishId: route.params.dishId,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

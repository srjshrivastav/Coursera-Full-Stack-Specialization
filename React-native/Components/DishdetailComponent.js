import React from "react";
import { Text, View, ScrollView, Modal, Button } from "react-native";
import { Card, Icon, Input, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";

function RenderComments(props) {
  const comments = props.comments;

  return (
    <Card title="Comments">
      {comments.map((comment) => (
        <View key={comment.id} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{comment.comment}</Text>
          <Text style={{ fontSize: 12 }}>{comment.rating} Stars</Text>
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
  console.log(props);
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{ flexDirection: "row", marginLeft: 100, marginRight: 100 }}
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
  state = {
    showModal: false,
  };
  toggleModal() {
    console.log(this.state);
    this.setState({ showModal: !this.state.showModal });
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
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
            startingValue={5}
            style={{ paddingVertical: 10 }}
            imageSize={30}
          />
          <Input
            placeholder="Author"
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
          ></Input>
          <View style={{ margin: 10 }}>
            <Button title="Submit" raised color="#512DA8" />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

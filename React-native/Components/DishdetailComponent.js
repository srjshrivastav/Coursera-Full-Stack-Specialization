import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Card, Icon } from "react-native-elements";
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

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={{ alignItems: "center" }}>
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
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Dishdetail extends React.Component {
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  render() {
    const { dishes, comments, dishId } = this.props;
    return (
      <ScrollView>
        <RenderDish
          dish={dishes.dishes[dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
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

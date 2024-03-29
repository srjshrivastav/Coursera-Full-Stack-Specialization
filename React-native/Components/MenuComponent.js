import React from "react";
import { View, FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

class Menu extends React.Component {
  render() {
    const handleItemClick = (dish) => {
      this.props.navigation.navigate("DishDetail", { dishId: dish.id });
    };

    const renderMenuItem = ({ item, index }) => {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() => handleItemClick(item)}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};
export default connect(mapStateToProps)(Menu);

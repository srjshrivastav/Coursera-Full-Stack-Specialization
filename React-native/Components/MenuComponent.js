import React from "react";
import { View, FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

class Menu extends React.Component {
  render() {
    const handleItemClick = (dish) => {
      this.props.navigation.navigate("DishDetail", { dishId: dish.id });
    };

    const renderMenuItem = ({ item, index }) => {
      return (
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => handleItemClick(item)}
          imageSrc={{ uri: baseUrl + item.image }}
        />
      );
    };

    return (
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};
export default connect(mapStateToProps)(Menu);

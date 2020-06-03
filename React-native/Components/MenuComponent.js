import React from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

class Menu extends React.Component {
  render() {
    const handleItemClick = (dish) => {
      this.props.navigation.navigate("DishDetail", { dishId: dish.id });
    };

    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => handleItemClick(item)}
          leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };

    return (
      <FlatList
        data={this.props.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Menu;

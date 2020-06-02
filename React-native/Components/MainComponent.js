import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Dishdetail from "./DishdetailComponent";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const Stack = createStackNavigator();
    const menu = () => {
      return (
        <Menu
          dishes={this.state.dishes}
          onPress={(dishId) => this.onDishSelect(dishId)}
        />
      );
    };
    const dishDetail = () => {
      return (
        <Dishdetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        />
      );
    };
    return (
      <NavigationContainer>
        <Stack.Navigator style={{ flex: 1 }}>
          <Stack.Screen name="Menu" component={menu} />
          <Stack.Screen name="DishDetail" component={dishDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;

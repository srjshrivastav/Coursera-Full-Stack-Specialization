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
    };
  }

  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
          headerMode="float"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        >
          <Stack.Screen name="Menu">
            {(props) => <Menu {...props} dishes={this.state.dishes} />}
          </Stack.Screen>
          <Stack.Screen name="DishDetail" component={Dishdetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;

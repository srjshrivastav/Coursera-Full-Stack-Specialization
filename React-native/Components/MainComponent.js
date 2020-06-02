import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";

function stack(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu">
        {(props) => <Menu {...props} dishes={DISHES} />}
      </Stack.Screen>
      <Stack.Screen name="DishDetail" component={Dishdetail} />
    </Stack.Navigator>
  );
}

class Main extends Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerType="slide"
          drawerPosition="left"
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Menu" component={stack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;

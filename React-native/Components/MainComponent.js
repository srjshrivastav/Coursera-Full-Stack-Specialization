import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import AboutUs from "./AboutComponent";
import { LEADERS } from "../shared/leaders";
import Contact from "./ContactComponent";

function stack(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Menu"
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
          drawerStyle={{
            backgroundColor: "#D1C4E9",
          }}
          drawerPosition="left"
          hideStatusBar
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerLabel: "Home",
            }}
          />
          <Drawer.Screen name="About US">
            {(props) => <AboutUs {...props} leaders={LEADERS} />}
          </Drawer.Screen>
          <Drawer.Screen name="Menu" component={stack} />

          <Drawer.Screen name="Contact Us" component={Contact} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;

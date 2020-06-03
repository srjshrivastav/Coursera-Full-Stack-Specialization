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

const Stack = createStackNavigator();

function MenuStack(props) {
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

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Home",
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function AboutStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "About Us",
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen name="About US">
        {(props) => <AboutUs {...props} leaders={LEADERS} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function ConatctStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen name="Conatct Us" component={Contact} />
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
        >
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="About US" component={AboutStack} />
          <Drawer.Screen name="Menu" component={MenuStack} />
          <Drawer.Screen name="Contact Us" component={ConatctStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;

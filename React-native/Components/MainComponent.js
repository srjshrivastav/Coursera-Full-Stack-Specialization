import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "./HomeComponent";
import AboutUs from "./AboutComponent";
import { LEADERS } from "../shared/leaders";
import Contact from "./ContactComponent";
import { Icon } from "react-native-elements";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";

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
      <Stack.Screen
        name="Menu"
        options={{
          headerLeft: () => {
            return (
              <Icon
                onPress={() => props.navigation.openDrawer()}
                title="menu"
                color="#fff"
                name="menu"
              />
            );
          },
        }}
      >
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
        headerLeft: () => {
          return (
            <Icon
              onPress={() => props.navigation.openDrawer()}
              title="menu"
              color="#fff"
              name="menu"
            />
          );
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
        headerLeft: () => {
          return (
            <Icon
              onPress={() => props.navigation.openDrawer()}
              title="menu"
              color="#fff"
              name="menu"
            />
          );
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
        headerLeft: () => {
          return (
            <Icon
              onPress={() => props.navigation.openDrawer()}
              title="menu"
              color="#fff"
              name="menu"
            />
          );
        },
      }}
    >
      <Stack.Screen name="Conatct Us" component={Contact} />
    </Stack.Navigator>
  );
}
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
    </SafeAreaView>
    <DrawerItemList {...props} />
  </ScrollView>
);

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
          drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default Main;

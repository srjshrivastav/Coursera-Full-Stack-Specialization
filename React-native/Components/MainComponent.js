import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerView,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Home from "./HomeComponent";
import AboutUs from "./AboutComponent";
import Contact from "./ContactComponent";
import { Icon } from "react-native-elements";
import Reservation from "./ReservationComponent";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";

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
        {(props) => <Menu {...props} />}
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
      <Stack.Screen name="About US" component={AboutUs} />
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

function ReserveStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Reserve Table",
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
      <Stack.Screen name="Conatct Us" component={Reservation} />
    </Stack.Navigator>
  );
}
const CustomDrawerContentComponent = (props) => (
  <View>
    <DrawerContentScrollView>
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
      <DrawerItem
        label="Home"
        icon={() => <Icon name="home" type="font-awesome" />}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="About Us"
        icon={() => <Icon name="info-circle" type="font-awesome" />}
        onPress={() => props.navigation.navigate("About US")}
      />
      <DrawerItem
        label="Menu"
        icon={({ tintColor }) => (
          <Icon name="list" type="font-awesome" color={tintColor} />
        )}
        onPress={() => props.navigation.navigate("Menu")}
      />
      <DrawerItem
        label="Conatct Us"
        icon={() => <Icon name="address-card" type="font-awesome" />}
        onPress={() => props.navigation.navigate("Contact Us")}
      />
      <DrawerItem
        label="Reserve"
        icon={() => <Icon name="cutlery" type="font-awesome" />}
        onPress={() => props.navigation.navigate("Reserve")}
      />
    </DrawerContentScrollView>
  </View>
);

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

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
          <Drawer.Screen name="Reserve" component={ReserveStack} />
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

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

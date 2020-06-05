import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Home from "./HomeComponent";
import AboutUs from "./AboutComponent";
import Contact from "./ContactComponent";
import { Icon } from "react-native-elements";
import Reservation from "./ReservationComponent";
import Login from "./LoginComponent";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  ToastAndroid,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import Favorites from "./FavouriteComponent";

const Stack = createStackNavigator();

function LoginStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Login",
        headerLeft: () => (
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
        ),
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

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
function FavoriteStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Favourite",
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
      <Stack.Screen name="Favourite" component={Favorites} />
    </Stack.Navigator>
  );
}

const CustomDrawerContentComponent = (props) => (
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
      label={() => <Text>Home</Text>}
      icon={() => <Icon name="home" type="font-awesome" />}
      onPress={() => props.navigation.navigate("Home")}
    />
    <DrawerItem
      label={() => <Text>About Us</Text>}
      icon={() => <Icon name="info-circle" type="font-awesome" />}
      onPress={() => props.navigation.navigate("About US")}
    />
    <DrawerItem
      label={() => <Text>Menu</Text>}
      icon={({ tintColor }) => (
        <Icon name="list" type="font-awesome" color={tintColor} />
      )}
      onPress={() => props.navigation.navigate("Menu")}
    />
    <DrawerItem
      label={() => <Text>Contact Us</Text>}
      icon={() => <Icon name="address-card" type="font-awesome" />}
      onPress={() => props.navigation.navigate("Contact Us")}
    />
    <DrawerItem
      label={() => <Text>Reserve</Text>}
      icon={() => <Icon name="cutlery" type="font-awesome" />}
      onPress={() => props.navigation.navigate("Reserve")}
    />
    <DrawerItem
      label={() => <Text>Favourite</Text>}
      icon={() => <Icon name="heart" type="font-awesome" />}
      onPress={() => props.navigation.navigate("favourite")}
    />
    <DrawerItem
      label={() => <Text>Login</Text>}
      icon={() => <Icon name="sign-in" type="font-awesome" />}
      onPress={() => props.navigation.navigate("Login")}
    />
  </DrawerContentScrollView>
);

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    NetInfo;
    NetInfo.fetch().then((connectionInfo) => {
      ToastAndroid.show(
        "Initial Network Connectivity Type: " +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType,
        ToastAndroid.LONG
      );
    });

    NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
  }
  componentWillUnmount() {
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case "none":
        ToastAndroid.show("You are now offline!", ToastAndroid.LONG);
        break;
      case "wifi":
        ToastAndroid.show("You are now connected to WiFi!", ToastAndroid.LONG);
        break;
      case "cellular":
        ToastAndroid.show(
          "You are now connected to Cellular!",
          ToastAndroid.LONG
        );
        break;
      case "unknown":
        ToastAndroid.show(
          "You now have unknown connection!",
          ToastAndroid.LONG
        );
        break;
      default:
        break;
    }
  };

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
          <Drawer.Screen name="favourite" component={FavoriteStack} />
          <Drawer.Screen name="Login" component={LoginStack} />
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

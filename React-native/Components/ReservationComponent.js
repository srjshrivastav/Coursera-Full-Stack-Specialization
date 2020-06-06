import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Animated,
  Alert,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Calendar from "expo-calendar";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.bounceValue = new Animated.Value(0);
    this.state = {
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    };
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    const { guests, smoking, date } = this.state;
    const final =
      "Number of guests :" +
      guests.toString() +
      "\nSmoking?" +
      smoking +
      "\nDate and Time :" +
      date;
    Alert.alert(
      "Your Reservation OK?",
      final,
      [
        {
          text: "CANCEL",
          onPress: () => this.resetForm(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => this.checkCalperm(),
        },
      ],
      {
        cancelable: true,
      }
    );
    this.toggleModal();
  }

  checkCalperm = async () => {
    let permission = await Calendar.getCalendarPermissionsAsync();
    if (permission.status === "granted") {
      this.setEvent();
    } else {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if (permission.status === "granted") {
        this.setEvent();
      }
    }
  };

  async setEvent() {
    const millisec = Date.parse(this.state.date);
    const startDate = new Date(millisec);
    const endDate = new Date(millisec + 2 * 60 * 60 * 1000);
    const calendars = await (await Calendar.getCalendarsAsync()).filter(
      ({ allowsModifications }) => allowsModifications
    );
    if (calendars.length === 0) {
      id = await this.createCalendar();
    } else {
      id = calendars[0].id;
    }
    Calendar.createEventAsync(id, {
      startDate,
      endDate,
      title: "Con Fusion Table Reservation",
      timeZone: "GMT+5:30",
    });
  }

  async createCalendar() {
    const newCalendarSource = {
      isLocalAccount: true,
      name: "Ristorant Confusion",
    };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Events",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: newCalendarSource.id,
      source: newCalendarSource,
      name: "Confusion",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      isPrimary: true,
    });

    return newCalendarID;
  }

  componentDidMount() {
    Animated.timing(this.bounceValue, {
      toValue: 1,
      duration: 1000,
    }).start();
    this.presentLocalNotification(this.state.date);
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }
  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + date + " requested",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: "#512DA8",
      },
    });
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    });
  }

  render() {
    return (
      <Animated.ScrollView style={{ transform: [{ scale: this.bounceValue }] }}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ guests: itemValue })
            }
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
          <Switch
            style={styles.formItem}
            value={this.state.smoking}
            trackColor="#512DA8"
            onValueChange={(value) => this.setState({ smoking: value })}
          ></Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <DatePicker
            style={{ flex: 2, marginRight: 20 }}
            date={this.state.date}
            format=""
            mode="datetime"
            placeholder="select date and Time"
            minDate="2017-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Button
            onPress={() => this.handleReservation()}
            title="Reserve"
            color="#512DA8"
            accessibilityLabel="Learn more about this purple button"
            disabled={this.state.date ? false : true}
          />
        </View>
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;

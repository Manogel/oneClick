import React, { Component } from "react";
import "~/config/ReactotronConfig";
import "~/services/notification";

import { StatusBar } from "react-native";
import firebase from 'react-native-firebase';
import createNavigator from "~/routes";
import AsyncStorage from "@react-native-community/async-storage";

export default class App extends Component {
  state = {
    userLogged: false,
    userChecked: false
  };

  async componentDidMount() {
    const id = await AsyncStorage.getItem("@OneClick:id");
    this.setState({
      userLogged: !!id,
      userChecked: true
    });
    this.checkPermission();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  render() {
    const { userLogged, userChecked } = this.state;

    if (!userChecked) return null;
    const Routes = createNavigator(userLogged);
    return (
      <>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Routes />
      </>
    );
  }
}


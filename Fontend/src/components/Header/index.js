import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Container, Title } from "./styles";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-community/async-storage";

class Header extends Component {
  singOut = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  render() {
    const { title } = this.props;
    return (
      <Container>
        <View />
        <Title>{title}</Title>
        <TouchableOpacity onPress={this.singOut}>
          <Icon name="logout" size={22} color="#fff" />
        </TouchableOpacity>
      </Container>
    );
  }
}

export default withNavigation(Header);

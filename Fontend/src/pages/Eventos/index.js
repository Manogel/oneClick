import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
import Header from "~/components/Header";
import EventoItem from "./ItemEvent";
import api from "~/services/api";
import PushNotification from "react-native-push-notification";
import {
  Container,
  ButtonAdd,
  BoxButton,
  ContainerError,
  TitleError
} from "./styles";
import {
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity
} from "react-native";

import NovoEvento from "~/components/Modal";
import store from "~/services/storage";
import compare from "~/scripts/compareDate";
import moment from "moment";

const TabIcon = ({ tintColor }) => (
  <Icon name="calendar" size={20} color={tintColor} />
);

export default class Eventos extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  state = {
    idUser: "",
    eventos: [],
    refreshing: false,
    loading: true,
    modalVisible: false,
    dataNow: "",
    horaNow: ""
  };

  getDateNow = () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const str_data =
      ano + "-" + ("0" + (mes + 1)).slice(-2) + "-" + ("0" + dia).slice(-2);
    const str_hora = ("0" + hora).slice(-2) + ":" + ("0" + minutos).slice(-2);
    this.setState({ dataNow: str_data, horaNow: str_hora });
    console.tron.log("data atual" + str_data + " " + str_hora);
  };

  setModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  };

  filterEvents = async () => {
    const id = await AsyncStorage.getItem("@OneClick:id");
    this.setState({ idUser: id });
    const { dataNow, horaNow, idUser } = this.state;
    const data = await store.get("@OneClick:data");
    //const { data } = await api.get(`/api/eventos/${id}`);
    if (!!data) {
      const eventos = data.filter(
        evento =>
          (evento.data_fim.slice(0, 10) == dataNow &&
            evento.hora_fim >= horaNow) ||
          evento.data_fim.slice(0, 10) > dataNow
      );
      console.tron.log(eventos.sort(compare));
      this.setState({
        eventos: eventos,
        loading: false,

        modalVisible: false
      });
    } else {
      this.loadEventos();
    }
  };

  async componentDidMount() {
    this.getDateNow();
    this.filterEvents();
  }

  deleteEvento = async id => {
    await api.delete(`/api/evento/${id}`);
    PushNotification.cancelLocalNotifications({ id: String(id) });
    this.setState({
      eventos: this.state.eventos.filter(evento => evento.id != id)
    });
    this.loadEventos();
  };

  loadEventos = async () => {
    const { dataNow, horaNow, idUser } = this.state;
    const { data } = await api.get(`/api/eventos/${idUser}`);
    if (!!data) {
      const eventos = data.filter(
        evento =>
          (evento.data_fim.slice(0, 10) == dataNow &&
            evento.hora_fim >= horaNow) ||
          evento.data_fim.slice(0, 10) > dataNow
      );
      eventos.sort(compare);
      await store.save("@OneClick:data", eventos);
      this.setState({ eventos: eventos, refreshing: false, loading: false });
    } else {
      this.setState({ refreshing: false, loading: false });
    }
  };

  renderListItem = ({ item }) => {
    console.tron.log(item);
    return (
      <EventoItem
        evento={item}
        loadEventos={this.loadEventos}
        deleteEvento={this.deleteEvento}
      />
    );
  };

  renderList = () => {
    const { eventos, refreshing } = this.state;
    if (eventos.length != 0) {
      return (
        <FlatList
          data={eventos}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderListItem}
          onRefresh={this.loadEventos}
          refreshing={refreshing}
        />
      );
    } else {
      return (
        <ContainerError>
          <TitleError>
            Não existem eventos cadastrados para este usuário!
          </TitleError>
        </ContainerError>
      );
    }
  };

  render() {
    const { loading, modalVisible, eventos } = this.state;
    return (
      <>
        <Header title="Eventos" />
        <Container>
          {loading ? (
            <ActivityIndicator color="#385774" size={30} />
          ) : (
            <>
              {this.renderList()}
              <BoxButton>
                <ButtonAdd onPress={this.setModalVisible}>
                  <Icon2 name="plus" size={30} color="#385774" />
                </ButtonAdd>
              </BoxButton>
            </>
          )}
        </Container>
        <NovoEvento
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
          loadEventos={this.loadEventos}
        />
      </>
    );
  }
}

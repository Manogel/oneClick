import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
import { ActivityIndicator, Text } from "react-native";
import Header from "~/components/Header";
import {
  Container,
  Butao,
  TextButton,
  BoxEvento,
  BoxButton,
  TextInfo,
  Container2
} from "./styles";

import ItemEvent from "./ItemEvent";
import compare from "~/scripts/compareDate";
import store from "~/services/storage";

const TabIcon = ({ tintColor }) => (
  <Icon name="book" size={20} color={tintColor} />
);
export default class Home extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };
  state = {
    eventos: [],
    dateNow: "",
    loading: false,
    info: false
  };
  componentDidMount() {
    this.getDateNow();
  }

  getDateNow = () => {
    const data = new Date();
    const dia = data.getDate(); // 1-31
    const mes = data.getMonth(); // 0-11 (zero=janeiro)
    const ano = data.getFullYear(); // 4 dígitos
    const str_data =
      ano + "-" + ("0" + (mes + 1)).slice(-2) + "-" + ("0" + dia).slice(-2);
    this.setState({ dateNow: str_data });
    console.tron.log("data atual" + str_data);
  };

  loadEventos = async () => {
    const data = await store.get("@OneClick:data");
    if (!!data) {
      console.tron.log(data);
      //const { data } = await api.get(`/api/eventos/${id}`);
      const eventos = data.filter(
        evento => evento.data_inicio >= this.state.dateNow
      );
      console.tron.log(eventos.sort(compare));
      this.setState({
        eventos: eventos,
        loading: false,
        info: true
      });
    } else {
      this.setState({
        loading: false,
        info: true
      });
    }
  };

  pesquisaEvento = () => {
    this.setState({ loading: true });
    this.loadEventos();
  };

  render() {
    const { loading, info, eventos } = this.state;
    return (
      <>
        <Header title="Home" />
        <Container>
          <Container2>
            <BoxButton>
              <Butao onPress={this.pesquisaEvento}>
                {loading ? (
                  <ActivityIndicator size={22} color="#fff" />
                ) : (
                  <Icon2 size={40} color="#fff" name="open-book" />
                )}
              </Butao>
            </BoxButton>
          </Container2>
          {info ? (
            <BoxEvento>
              {!!eventos[0] ? (
                <ItemEvent evento={eventos[0]} />
              ) : (
                <TextInfo>Não há eventos cadastrados!</TextInfo>
              )}
            </BoxEvento>
          ) : (
            <TextInfo>
              Clique no botão de acima e saiba quando será o seu próximo evento!
            </TextInfo>
          )}
        </Container>
      </>
    );
  }
}

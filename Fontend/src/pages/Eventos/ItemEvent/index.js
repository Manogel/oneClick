import React, { Component } from "react";
import {
  Container,
  Title,
  Descricao,
  BoxHora,
  Hora,
  BoxData,
  Data,
  Header
} from "./styles";
import { TouchableOpacity, Alert } from "react-native";
import Icon2 from "react-native-vector-icons/Entypo";
import Modal from "~/components/Modal";
import formatData from "~/scripts/FormatData";

export default class ItemEvent extends Component {
  state = {
    expand: false,
    modalVisible: false,
    evento: {}
  };

  expandir = () => {
    this.setState({ expand: !this.state.expand });
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  alert = id => {
    const { deleteEvento } = this.props;
    Alert.alert(
      "Atenção",
      "Deseja mesmo deletar este evento?",
      [
        {
          text: "Cancelar"
        },
        { text: "Sim", onPress: () => deleteEvento(id) }
      ],
      { cancelable: false }
    );
  };

  render() {
    let { evento, loadEventos, editEnabled } = this.props;
    const { expand, modalVisible } = this.state;
    evento = {
      ...evento,
      data_inicio: !!evento.data_inicio ? evento.data_inicio.slice(0, 10) : "",
      data_fim: !!evento.data_fim ? evento.data_fim.slice(0, 10) : ""
    };
    return (
      <>
        <Container>
          <Header>
            <TouchableOpacity onPress={this.expandir}>
              <Icon2
                name={expand ? "chevron-thin-up" : "chevron-thin-down"}
                color="#456"
                size={22}
              />
            </TouchableOpacity>
            <Title>{evento.titulo}</Title>
            
            {expand ? (
              <TouchableOpacity onPress={this.setModalVisible}>
                <Icon2 name="edit" color="#456" size={22} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.alert(evento.id)}>
                <Icon2 name="cross" color="#456" size={22} />
              </TouchableOpacity>
            )}
          </Header>
          <BoxData>
            <Data> Início: {formatData(evento.data_inicio)}</Data>
            <Data> Término: {formatData(evento.data_fim)}</Data>
          </BoxData>
          <BoxHora>
            <Hora> Horário: {evento.hora_inicio}h</Hora>
            <Hora> Término: {evento.hora_fim}h </Hora>
          </BoxHora>
          {expand && <Descricao>{evento.descricao}</Descricao>}
        </Container>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          data={evento}
          loadEventos={loadEventos}
        />
      </>
    );
  }
}

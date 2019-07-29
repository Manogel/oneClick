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
import formatData from "~/scripts/FormatData";

export default class ItemEvent extends Component {
  render() {
    let { evento } = this.props;
    evento = {
      ...evento,
      data_inicio: !!evento.data_inicio ? evento.data_inicio.slice(0, 10) : "",
      data_fim: !!evento.data_fim ? evento.data_fim.slice(0, 10) : ""
    };
    return (
      <>
        <Container>
          <Header>
            <Title>{evento.titulo}</Title>
          </Header>
          <BoxData>
            <Data> Início: {formatData(evento.data_inicio)}</Data>
            <Data> Término: {formatData(evento.data_fim)}</Data>
          </BoxData>
          <BoxHora>
            <Hora> Horário: {evento.hora_inicio}h</Hora>
            <Hora> Término: {evento.hora_fim}h </Hora>
          </BoxHora>
          <Descricao>{evento.descricao}</Descricao>
        </Container>
      </>
    );
  }
}

import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import Icon2 from "react-native-vector-icons/Entypo";
import PushNotification from "react-native-push-notification";
import {
  BoxModal,
  ViewModal,
  Title,
  Top,
  Input,
  Container2,
  TextButton,
  Button,
  BoxDate,
  AreaText,
  Span
} from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import api from "~/services/api";
import DateTime from "../DateTime";
import moment from "moment";

const styles = StyleSheet.create({
  dataTime: {
    height: 42,
    backgroundColor: "#fff",
    width: 100,
    borderRadius: 4,
    marginBottom: 10,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#385774"
  }
});

class Modal extends Component {
  state = {
    evento: {
      titulo: "",
      hora_fim: "",
      hora_inicio: "",
      data_inicio: "",
      data_fim: "",
      descricao: ""
    },
    loading: false,
    idUser: ""
  };

  async componentDidMount() {
    const { data } = this.props;
    if (!!data) {
      this.setState({ idUser: data.user_id, evento: data });
    } else {
      const id = await AsyncStorage.getItem("@OneClick:id");
      this.setState({ idUser: id });
    }
  }

  validation = () => {
    const { evento, loading } = this.state;
    if (
      evento.titulo == "" ||
      evento.data_inicio == "" ||
      evento.data_fim == "" ||
      evento.hora_inicio == "" ||
      evento.hora_fim == ""
    ) {
      this.setState({ loading: false });
      Alert.alert("Preencha os campos!!");
      return true;
    }
    if (
      evento.hora_inicio > evento.hora_fim &&
      evento.data_inicio == evento.data_fim
    ) {
      Alert.alert("Intervalo em horas não valido!!");
      this.setState({ loading: false });
      return true;
    }
    return false;
  };

  cadastrarEvento = async () => {
    this.setState({ loading: true });
    const { idUser, evento, loading } = this.state;
    if (this.validation()) return;
    try {
      const { loadEventos } = this.props;
      const { data } = await api.postOrPut("/api/evento", evento.id, {
        ...evento,
        user_id: idUser
      });
      let text = !!evento.id ? "Evento Atualizado" : "Evento Cadastrado!";
      let hora = "07:00";

      if (evento.hora_inicio >= "00:00" && evento.hora_inicio <= "01:00") {
        hora = evento.hora_inicio;
      }
      if (evento.hora_inicio > "01:00" && evento.hora_inicio < "07:00") {
        hora = "01:01";
      }
      if (evento.hora_inicio == "07:00") {
        hora = "06:00";
      }

      PushNotification.localNotificationSchedule({
        id: String(data.id),
        title: "Você possui um evento hoje!",
        message: "Evento: " + evento.titulo,
        date: moment(
          evento.data_inicio + " " + hora,
          "YYYY-MM-DD HH:mm"
        ).toDate()
      });
      Alert.alert(text);
      loadEventos();
      if (!!evento.id) {
        this.setState({
          loading: false,
          evento: {
            ...data,
            data_inicio: data.data_inicio.slice(0, 10),
            data_fim: data.data_fim.slice(0, 10)
          }
        });
      } else {
        this.setState({
          loading: false,
          evento: {
            titulo: "",
            hora_fim: "",
            hora_inicio: "",
            data_inicio: "",
            data_fim: "",
            descricao: ""
          }
        });
      }
    } catch (err) {
      Alert.alert("Erro ao salvar!");
    }
  };

  render() {
    const { setModalVisible, modalVisible } = this.props;
    const { evento, loading } = this.state;
    return (
      <BoxModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible();
        }}
      >
        <Container2>
          <ViewModal>
            <Top>
              <View>
                <Title>Evento</Title>
              </View>
              <TouchableOpacity onPress={setModalVisible}>
                <Icon2 name="cross" size={26} color="#999" />
              </TouchableOpacity>
            </Top>

            <Input
              value={evento.titulo}
              onChangeText={text =>
                this.setState({
                  evento: { ...evento, titulo: text }
                })
              }
              placeholder="Titulo"
              maxLength={28}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
            {evento.titulo == "" && <Span> Obrigatório!</Span>}
            <BoxDate>
              <View>
                <DateTime
                  date={evento.data_inicio}
                  placeholder="Data Inicio"
                  style={styles.dataTime}
                  onDateChange={date => {
                    this.setState({ evento: { ...evento, data_inicio: date } });
                  }}
                  mode="date"
                  format="YYYY-MM-DD"
                />
                {evento.data_inicio == "" && <Span> Obrigatório!</Span>}
              </View>
              <View>
                <DateTime
                  date={evento.data_fim}
                  placeholder="Data Fim"
                  style={styles.dataTime}
                  minDate={evento.data_inicio}
                  onDateChange={date =>
                    this.setState({ evento: { ...evento, data_fim: date } })
                  }
                  mode="date"
                  format="YYYY-MM-DD"
                />
                {evento.data_fim == "" && <Span> Obrigatório!</Span>}
              </View>
            </BoxDate>

            <BoxDate>
              <View>
                <DateTime
                  date={evento.hora_inicio}
                  placeholder="Hora Inicio"
                  style={styles.dataTime}
                  onDateChange={time =>
                    this.setState({ evento: { ...evento, hora_inicio: time } })
                  }
                  mode="time"
                  format="HH:mm"
                />
                {evento.hora_inicio == "" && <Span> Obrigatório!</Span>}
              </View>
              <View>
                <DateTime
                  date={evento.hora_fim}
                  placeholder="Hora Fim"
                  style={styles.dataTime}
                  onDateChange={time => {
                    this.setState({ evento: { ...evento, hora_fim: time } });
                  }}
                  mode="time"
                  format="HH:mm"
                />
                {evento.hora_fim == "" && <Span> Obrigatório!</Span>}
              </View>
            </BoxDate>

            <AreaText
              value={evento.descricao}
              onChangeText={text =>
                this.setState({
                  evento: { ...evento, descricao: text }
                })
              }
              placeholder="Descrição"
              multiline
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              maxLength={200}
              numberOfLines={4}
            />
            <Button onPress={this.cadastrarEvento}>
              {this.state.loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <TextButton>
                  {!!evento.user_id
                    ? "Atualizar Informações"
                    : "Cadastrar Evento"}
                </TextButton>
              )}
            </Button>
          </ViewModal>
        </Container2>
      </BoxModal>
    );
  }
}

export default Modal;

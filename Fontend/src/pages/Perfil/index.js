import React, { Component } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Alert,
  StyleSheet,
  View
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "~/components/Header";
import Icon2 from "react-native-vector-icons/Entypo";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Container,
  BoxImage,
  BorderImage,
  BoxInfo,
  TextInfo,
  ContainerInfo,
  ButtonEdit,
  ButtonText,
  Input
} from "./styles";
import api from "~/services/api";
import store from "~/services/storage";
import DatePicker from "react-native-datepicker";

const styles = StyleSheet.create({
  dataTime: {
    width: 200,
    justifyContent: "flex-start",
    marginLeft: 20,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#33e0ff"
  }
});

const TabIcon = ({ tintColor }) => (
  <Icon name="user" size={20} color={tintColor} />
);

export default class Perfil extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  state = {
    idUser: "",
    data: {},
    edit: false,
    loading: true
  };

  async componentDidMount() {
    const perfil = await store.get("@OneClick:perfil");
    if (!!perfil) {
      const id = await store.get("@OneClick:id");
      this.setState({ data: perfil, loading: false, idUser: id });
    } else {
      this.attDataUser();
    }
  }

  attDataUser = async () => {
    const id = await store.get("@OneClick:id");
    const { data } = await api.get(`/api/usuario/${id}`);
    this.setState({
      data: {
        ...data,
        data_nasc: !!data.data_nasc ? data.data_nasc.slice(0, 10) : ""
      },
      loading: false,
      idUser: id
    });
  };

  updateUser = async () => {
    try {
      const { idUser, data, edit } = this.state;
      let email2 = data.login;
      let login2 = data.email;
      console.log(data);
      const response = await api.put(`/api/usuario/${idUser}`, {
        ...data,
        email: email2,
        login: login2,
        username: login2
      });

      this.setState({ edit: !edit });
      await store.save("@OneClick:perfil", data);
      Alert.alert("Dados atualizados");
    } catch (err) {
      Alert.alert("Erro na conexão");
    }
  };

  render() {
    const { data, edit, loading } = this.state;
    return (
      <>
        <Header title="Perfil" />
        <ScrollView>
          <Container>
            {loading ? (
              <>
                <Spinner
                  visible={loading}
                  textStyle={{ color: "#385774" }}
                  textContent={"Carregando..."}
                />
              </>
            ) : (
              <>
                <BoxImage>
                  <BorderImage>
                    <Icon2 size={55} color="#999" name="user" />
                  </BorderImage>
                </BoxImage>
                <ContainerInfo>
                  <BoxInfo>
                    <Icon2
                      name="user"
                      size={20}
                      color={edit ? "#333" : "#999"}
                    />
                    {edit ? (
                      <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        value={data.nome}
                        onChangeText={text =>
                          this.setState({
                            data: { ...this.state.data, nome: text }
                          })
                        }
                      />
                    ) : (
                      <TextInfo>{data.nome}</TextInfo>
                    )}
                  </BoxInfo>
                  <BoxInfo>
                    <Icon2
                      name="cake"
                      size={20}
                      color={edit ? "#333" : "#999"}
                    />
                    {edit ? (
                      <DatePicker
                        showIcon={false}
                        placeholder="Data Nascimento"
                        mode="date"
                        format="YYYY-MM-DD"
                        date={data.data_nasc}
                        style={styles.dataTime}
                        onDateChange={text =>
                          this.setState({ data: { ...data, data_nasc: text } })
                        }
                        maxDate="2040-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        androidMode="spinner"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0,
                            marginLeft: 0,
                            padding: 0,
                            textAlign: "left"
                          },
                          dateText: {
                            textAlign: "left",
                            marginLeft: 0,
                            borderWidth: 0,
                            paddingLeft: 0,
                            color: "#000"
                          },
                          placeholderText: {
                            marginLeft: 0,
                            borderWidth: 0,
                            paddingLeft: 0,
                            padding: 0,
                            color: "#999",
                            textAlign: "left"
                          }
                        }}
                      />
                    ) : (
                      <TextInfo>{data.data_nasc}</TextInfo>
                    )}
                  </BoxInfo>
                  <BoxInfo>
                    <Icon2
                      name="graduation-cap"
                      size={20}
                      color={edit ? "#333" : "#999"}
                    />
                    {edit ? (
                      <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        value={data.escolaridade}
                        onChangeText={text =>
                          this.setState({
                            data: { ...this.state.data, escolaridade: text }
                          })
                        }
                      />
                    ) : (
                      <TextInfo>{data.escolaridade}</TextInfo>
                    )}
                  </BoxInfo>
                  <BoxInfo>
                    <Icon2
                      name="mail"
                      size={20}
                      color={edit ? "#333" : "#999"}
                    />
                    {edit ? (
                      <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        value={data.login}
                        onChangeText={text =>
                          this.setState({
                            data: { ...this.state.data, login: text }
                          })
                        }
                      />
                    ) : (
                      <TextInfo>{data.login}</TextInfo>
                    )}
                  </BoxInfo>
                  <BoxInfo>
                    <Icon2
                      name="login"
                      size={20}
                      color={edit ? "#333" : "#999"}
                    />
                    {edit ? (
                      <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        value={data.email}
                        onChangeText={text =>
                          this.setState({
                            data: {
                              ...this.state.data,
                              email: text
                            }
                          })
                        }
                      />
                    ) : (
                      <TextInfo>{data.email}</TextInfo>
                    )}
                  </BoxInfo>
                  <BoxInfo>
                    <Icon2
                      name="key"
                      size={20}
                      color={edit ? "#333" : "#999"}
                    />
                    {edit ? (
                      <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        secureTextEntry
                        onChangeText={text =>
                          this.setState({
                            data: { ...this.state.data, password: text }
                          })
                        }
                      />
                    ) : (
                      <TextInfo>*********</TextInfo>
                    )}
                  </BoxInfo>
                </ContainerInfo>

                {edit ? (
                  <ButtonEdit onPress={this.updateUser}>
                    <ButtonText> Salvar </ButtonText>
                  </ButtonEdit>
                ) : (
                  <ButtonEdit
                    onPress={() => {
                      this.setState({ edit: !edit });
                    }}
                  >
                    <ButtonText> Editar Informações </ButtonText>
                  </ButtonEdit>
                )}
              </>
            )}
          </Container>
        </ScrollView>
      </>
    );
  }
}

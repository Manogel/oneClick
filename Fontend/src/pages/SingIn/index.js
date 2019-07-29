import React, { Component } from "react";
import {
  Container,
  Form,
  Input,
  Title,
  SubTitle,
  Button,
  TextButton,
  Error,
  Box
} from "./styles";
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "~/services/api";
import DatePicker from "react-native-datepicker";

const styles = StyleSheet.create({
  dataTime: {
    height: 42,
    backgroundColor: "#fff",
    width: 280,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 15
  }
});

export default class SingIn extends Component {
  state = {
    nome: "",
    data_nasc: "",
    login: "",
    email: "",
    senha: "",
    senha_confirm: "",
    escolaridade: "",
    loading: false,
    error: false,
    error_senha: false
  };

  cadastro = async () => {
    this.setState({ loading: true });
    const { navigation } = this.props;
    const {
      login,
      senha,
      email,
      escolaridade,
      data_nasc,
      nome,
      senha_confirm
    } = this.state;

    if (senha !== senha_confirm) {
      this.setState({ error_senha: true, loading: false });
    } else {
      if (
        nome == "" ||
        login == "" ||
        senha == "" ||
        email == "" ||
        escolaridade == "" ||
        data_nasc == ""
      ) {
        this.setState({ error: true, loading: false, error_senha: false });
      } else {
        let data = {
          nome: nome,
          password: senha,
          login: login,
          escolaridade: escolaridade,
          email: email,
          username: login,
          data_nasc: data_nasc
        };
        await api.post("/auth/registrar", data);
        navigation.navigate("Login");
      }
    }
  };

  render() {
    const {
      error,
      loading,
      login,
      senha,
      email,
      escolaridade,
      data_nasc,
      nome,
      senha_confirm,
      error_senha
    } = this.state;
    return (
      <Box>
        <TouchableOpacity>
          <Icon
            name="chevron-circle-left"
            color="#ddd"
            size={34}
            style={{ marginLeft: 20 }}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          />
        </TouchableOpacity>
        <Title> Cadrastre-se</Title>
        <Container>
          <ScrollView>
            <SubTitle>Insira seus dados!</SubTitle>
            <Form>
              <Input
                placeholder="Nome Completo"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={nome}
                onChangeText={text => this.setState({ nome: text })}
              />

              <DatePicker
                showIcon={false}
                placeholder="Data Nascimento"
                mode="date"
                format="YYYY-MM-DD"
                date={data_nasc}
                style={styles.dataTime}
                onDateChange={text => this.setState({ data_nasc: text })}
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
              <Input
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                placeholder="Escolaridade"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={escolaridade}
                onChangeText={text => this.setState({ escolaridade: text })}
              />
              <Input
                placeholder="Usuário"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={login}
                onChangeText={text => this.setState({ login: text })}
              />
              <Input
                placeholder="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={senha}
                onChangeText={text => this.setState({ senha: text })}
                secureTextEntry
              />
              <Input
                secureTextEntry
                placeholder="Confirme a senha"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={senha_confirm}
                onChangeText={text => this.setState({ senha_confirm: text })}
              />
              {error_senha && <Error> Senhas não coincidem </Error>}
              {error && <Error> Ocoreu um erro, verifique os campos! </Error>}
              <Button onPress={this.cadastro}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <TextButton> Registrar </TextButton>
                )}
              </Button>
            </Form>
          </ScrollView>
        </Container>
      </Box>
    );
  }
}

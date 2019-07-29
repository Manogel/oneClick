import React, { Component } from "react";
import api from "~/services/api";
import { ActivityIndicator } from "react-native";

import {
  Container,
  Form,
  Input,
  Title,
  SubTitle,
  Button,
  TextButton,
  Error
} from "./styles";
import store from "~/services/storage";

export default class Login extends Component {
  state = {
    login: "",
    senha: "",
    loading: false,
    error: false,
    loading2: false
  };

  login = async () => {
    const { login, senha } = this.state;
    const { navigation } = this.props;

    if (login == "" || senha == "") {
      this.setState({ loading: false, error: true });
      return;
    }

    this.setState({ loading: true });
    let dados = {
      email: login,
      password: senha
    };

    const response = await api.post("/auth/login", dados);

    if (!!response.data.length) {
      try {
        await store.save("@OneClick:id", response.data[0].id);
        navigation.navigate("User");
      } catch (err) {
        this.setState({
          error: true,
          loading: false
        });
      }
    } else {
      this.setState({
        error: true,
        loading: false
      });
    }
  };

  registrar = () => {
    const { navigation } = this.props;
    this.setState({ loading2: true });
    navigation.navigate("SingIn");
  };

  render() {
    const { login, senha, loading, error, loading2 } = this.state;
    return (
      <Container>
        <Title> Bem vindo ao OneClick </Title>
        <SubTitle>
          Insira suas credenciais e nunca mais perca seus eventos!
        </SubTitle>
        {error && <Error> Usuário Inexistente </Error>}
        <Form>
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
            secureTextEntry
            onChangeText={text => this.setState({ senha: text })}
          />
          <Button onPress={this.login}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <TextButton> Entrar </TextButton>
            )}
          </Button>
          <Button onPress={this.registrar}>
            {loading2 ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <TextButton> Registre-se </TextButton>
            )}
          </Button>
        </Form>
      </Container>
    );
  }
}

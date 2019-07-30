"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request, response }) {
    const input2 = {
      nome: request.input("nome"),
      login: request.input("email"),
      password: request.input("password"),
      email: request.input("login"),
      escolaridade: request.input("escolaridade"),
      data_nasc: request.input("data_nasc"),
      username: request.input("username")
    };

    const user = await User.create(input2);
    return response.json(user);
  }

  async login({ response, request, auth }) {
    const { email, password } = request.all();
    //const token = await auth.attempt(email, password);
    const usuario = await User.query()
      .where({ email })
      .fetch();
    //return token;
    return response.json(usuario);
  }

  async buscar({ response, request, auth }) {
    const { email } = request.all();
    const usuario = await User.query()
      .where({ email })
      .fetch();
    return response.json(usuario);
  }
}

module.exports = AuthController;

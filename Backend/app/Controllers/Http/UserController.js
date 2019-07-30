"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ request, response, view }) {
    let users = await User.all();
    return response.json(users);
  }

  async update({ params, request, response }) {
    const nome = request.input("nome");
    const username = request.input("email");
    const email = request.input("login");
    const password = request.input("password");
    const escolaridade = request.input("escolaridade");
    const data_nasc = request.input("data_nasc");

    let user = await User.find(params.id);

    user.nome = nome;
    user.login = username;
    user.email = email;
    user.password = password;
    user.escolaridade = escolaridade;
    user.data_nasc = data_nasc;

    await user.save();
    return response.json(user);
  }

  async destroy({ params, request, response }) {
    const id = await User.find(params.id);
    id.delete();
    return response.json({ message: "Usuario deletado!" });
  }

  async show({ params, request, response, view }) {
    const usuario = await User.find(params.id);

    return response.json(usuario);
  }
}

module.exports = UserController;

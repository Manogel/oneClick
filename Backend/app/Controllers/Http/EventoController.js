"use strict";

const Evento = use("App/Models/Evento");

class EventoController {
  async index({ request, response, view }) {
    let imoveis = await Evento.query()
      .with("usuario")
      .fetch();
    return response.json(imoveis);
  }

  async store({ request, response }) {
    const titulo = request.input("titulo");
    const descricao = request.input("descricao");
    const data_inicio = request.input("data_inicio");
    const data_fim = request.input("data_fim");
    const hora_inicio = request.input("hora_inicio");
    const hora_fim = request.input("hora_fim");
    const links = request.input("links");

    const usuario_id = request.input("user_id");

    const imovel = new Evento();
    imovel.titulo = titulo;
    imovel.descricao = descricao;
    imovel.data_inicio = data_inicio;
    imovel.data_fim = data_fim;
    imovel.hora_inicio = hora_inicio;
    imovel.hora_fim = hora_fim;
    imovel.links = links;
    imovel.user_id = usuario_id;

    await imovel.save();
    return response.json(imovel);
  }

  async show({ params, request, response, view }) {
    const imovel = await Evento.find(params.id);

    return response.json(imovel);
  }

  async update({ params, request, response }) {
    const titulo = request.input("titulo");
    const descricao = request.input("descricao");
    const data_inicio = request.input("data_inicio");
    const data_fim = request.input("data_fim");
    const hora_inicio = request.input("hora_inicio");
    const hora_fim = request.input("hora_fim");
    const links = request.input("links");
    const usuario_id = request.input("usuario_id");

    let imovel = await Evento.find(params.id);

    imovel.titulo = titulo;
    imovel.descricao = descricao;
    imovel.data_inicio = data_inicio;
    imovel.data_fim = data_fim;
    imovel.hora_inicio = hora_inicio;
    imovel.hora_fim = hora_fim;
    imovel.links = links;
    imovel.usuario_id = usuario_id;

    await imovel.save();
    return response.json(imovel);
  }

  async showPorUsuario({ params, request, response, view }) {
    const eventos = await Evento.query()
      .where({ user_id: params.id })
      .with("usuario")
      .fetch();
    return response.json(eventos);
  }

  async destroy({ params, request, response }) {
    const imovel = await Evento.find(params.id);
    imovel.delete();
    return response.json({ message: "Evento deletado!" });
  }
}
module.exports = EventoController;

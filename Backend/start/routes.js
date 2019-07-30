"use strict";

const Route = use("Route");

/* Route.put('/api/contatos/:id', 'ContatoController.update').middleware('auth');
Route.delete('/api/contatos/id', 'ContatoController.destroy').middleware('auth');
Route.post('/api/contatos', 'ContatoController.store').middleware('auth');
Route.get('/api/contatos', 'ContatoController.index'); */

//Route.resource('/api/estados','EstadoController');
//Route.get('/auth/register', 'UserController.index');
//Route.delete('/auth/register/id', 'UserController.destroy');

Route.post("/auth/registrar", "AuthController.register");
Route.post("/api/evento", "EventoController.store");

Route.get("/api/usuarios", "UserController.index");
Route.get("/api/eventos", "EventoController.index");

Route.get("/api/eventos/:id", "EventoController.showPorUsuario");

Route.delete("/api/usuarios", "UserController.destroyAll");
Route.delete("/api/eventos", "EventoController.destroyAll");

Route.delete("/api/usuario/:id", "UserController.destroy");
Route.delete("/api/evento/:id", "EventoController.destroy");

Route.put("/api/usuario/:id", "UserController.update");
Route.put("/api/evento/:id", "EventoController.update");

Route.get("/api/evento/:id", "EventoController.show");
Route.get("/api/usuario/:id", "UserController.show");

Route.post("/api/evento", "EventoController.store");

Route.post("/auth/login", "AuthController.login");

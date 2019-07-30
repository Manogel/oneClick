'use strict'

const Schema = use('Schema')

class EventoSchema extends Schema {
  up() {
    this.create('eventos', (table) => {
      table.increments()

      table.string('titulo').notNullable()
      table.string('descricao').notNullable()
      table.date('data_inicio').notNullable()
      table.date('data_fim')
      table.string('hora_inicio').notNullable()
      table.string('hora_fim')
      table.string('links')

      table.integer('user_id').unsigned().references('id').inTable('users')

      table.timestamps()
    })
  }

  down() {
    this.drop('eventos')
  }
}

module.exports = EventoSchema

// Update with your config settings.

module.exports = {

  client: 'postgresql',
  connection: {
    database: 'tasks',
    user:     'postgres',
    password: '110410'
  },
  pool: {
    min: 2,
    max: 10,
    propagateCreateError: false
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
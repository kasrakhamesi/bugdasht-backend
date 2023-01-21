module.exports = {
  development: {
    username: 'root',
    password: 'kasra123',
    database: 'bugdasht',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      acquire: 1000000
    }
  }
}

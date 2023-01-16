module.exports = {
  development: {
    username: DATABASE_USERNAME || 'root',
    password: DATABASE_PASSWORD || '',
    database: DATABASE_NAME || 'bugdasht',
    host: DATABASE_HOST || '127.0.0.1',
    port: DATABASE_PORT || 3306,
    dialect: DATABASE_DIALECT || 'mysql',
    logging: false,
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      acquire: 1000000
    }
  }
}

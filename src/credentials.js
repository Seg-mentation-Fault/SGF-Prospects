module.exports = {
  db: {
    connectionLimit: 10,
    database: process.env.DB_PROSPECTS,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    host: process.env.HOST,
    port: 3306,
  },
};

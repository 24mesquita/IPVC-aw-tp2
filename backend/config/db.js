import Sequelize from "sequelize";

const dbInstance = new Sequelize({
  host: "localhost",
  port: 8886,
  username: "myUsername",
  password: "MySecretPassword",
  database: "db_aw_tp2",
  dialect: "mysql",
});

export { dbInstance };

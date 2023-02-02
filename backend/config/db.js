import Sequelize from "sequelize";

const dbInstance = new Sequelize({
  host: "localhost",
  port: 8886,
  username: "root",
  password: "",
  database: "db_aw_tp2",
  dialect: "mysql",
});

export { dbInstance };

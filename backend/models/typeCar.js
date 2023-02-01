import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const TypeCarModel = dbInstance.define(
    "typeCar" /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }
);

export { TypeCarModel };


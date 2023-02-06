import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";


const BrandsModel = dbInstance.define(
    "brands" /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome_marca: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }
);



export { BrandsModel };
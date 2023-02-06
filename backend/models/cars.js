import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { TypeCarModel } from "./typeCar.js";

const CarsModel = dbInstance.define(
    "cars" /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        matricula: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
        marca: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        modelo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ano: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        preco: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sobre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imagem: {
            type: Sequelize.STRING,
            defaultValue:'default.png',
        },
        typeCarId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: TypeCarModel,
                key: "id"
            }
        },
    }
);
CarsModel.belongsTo(TypeCarModel, { foreignKey: "typeCarId" });


export { CarsModel };
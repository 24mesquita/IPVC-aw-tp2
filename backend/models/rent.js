import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import moment from 'moment';
import { UserModel } from "./users.js";
import { CarsModel } from "./cars.js";

const RentModel = dbInstance.define(
    "rent" /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        startDate: {
            type: Sequelize.DATE,
            defaultValue: moment.utc().format('YYYY-MM-DD'),
        },
        endDate: {
            type: Sequelize.DATE,
            defaultValue: moment.utc().format('YYYY-MM-DD'),
        },


        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        id_car: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
    },  
);
UserModel.hasMany(RentModel, { foreignKey: 'id_user' });
RentModel.belongsTo(UserModel, { foreignKey: 'id_user' });

RentModel.belongsTo(CarsModel, { foreignKey: 'id_car', targetKey: 'id' });

export { RentModel };
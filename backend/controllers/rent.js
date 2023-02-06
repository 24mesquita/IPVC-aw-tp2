import { RentModel} from "../models/rent.js";
import { CarsModel } from "../models/cars.js";


//create new rent verify if car is available in the dates
export const createRent = async (req, res) => {
    try {
        const { id_car, id_user, startDate, endDate } = req.body;
        const carExist = await RentModel.findAll({
            where:{
                id_car:id_car,
                release:{
                   [Sequelize.Op.between]: [startDate, endDate],
                   },
                }   
        });
        if (carExist) {
        res.status(400).send({ message: "Carro não disponivel" });
        } else {
        const newRent = await RentModel.create({
            id_car,
            id_user,
            startDate,
            endDate,
        });
        res.status(201).send({ message: "Aluguer criado com sucesso", newRent });
        }
    }catch (error) {
        res.status(500).send({ message: "Error creating rent", error: error.message });
    }
    }





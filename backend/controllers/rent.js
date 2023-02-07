import { RentModel} from "../models/rent.js";
import { Sequelize } from "sequelize";
import { UserModel } from "../models/users.js";

import { CarsModel } from "../models/cars.js";

// //create new rent
// export const createRent = async (req, res) => {
//     try {
//         const { id_car, id_user, startDate, endDate } = req.body;
//         const newRent = await RentModel.create({
//             id_car,
//             id_user,
//             startDate,  
//             endDate,    
//         });
//         res.status(201).send({ message: "Aluguer criado com sucesso", newRent });
//     }catch (error) {
//         res.status(500).send({ message: "Error creating rent", error: error.message });
//     }
// }
//create new rent verify if car is available in the dates
export const createRent = async (req, res) => {
    try {
        const { id_car, id_user, startDate, endDate } = req.body;
        const carExist = await CarsModel.findOne({ where: { id: id_car } })
        if (carExist) {
            const rentExist = await RentModel.findAll({
                where: {
                    id_car: id_car,
                    startDate,
                    endDate,
                }
            })
            if (rentExist.length > 0) {
                res.status(400).send({ message: 'Carro não disponível' })
            } else {
                const newRent = await RentModel.create({
                    id_car,
                    id_user,
                    startDate,
                    endDate,
                });
                res.status(201).send({ message: "Aluguer criado com sucesso", newRent });
            }
        } else {
            res.status(404).send({ message: 'Carro não existe' })
        }
    } catch (error) {
        res.status(500).send({ message: "Error creating rent", error: error.message });
    }
}

// get all rents, get marca and matricula from cars and name from users
export const getAllRents = async (req, res) => {
    try {
        const rents = await RentModel.findAll({
            include: [
                {
                    model: CarsModel,
                    attributes: ['marca', 'matricula'],
                },
                {
                    model: UserModel,
                    attributes: ['username'],
                },
            ],
        });
        res.status(200).send(rents);
    } catch (error) {
        res.status(500).send({ message: "Error getting rents", error: error.message });
    }
}
//get all rents from user

export const getAllRentsUser = async (req, res) => {
    try {
        const { id } = req.params
        const rents = await RentModel.findAll({
            where: {
                id_user: id,
            },
            
            include: [
                {
                    model: CarsModel,
                    attributes: ['marca', 'matricula', 'preco', 'imagem'],
                },
            ],
            order: [["createdAt", 'DESC']],
            
        });
        res.status(200).send(rents);
    } catch (error) {
        res.status(500).send({ message: "Error getting rents", error: error.message });
    }
}


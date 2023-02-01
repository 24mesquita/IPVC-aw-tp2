import {CarsModel} from '../models/cars.js';

// create new car, verify if matricula already exists
export const createCar = async (req, res) => {
    const { matricula, marca, modelo, id_typeCar } = req.body;
    const car = await CarsModel.findOne({ where: { matricula } });
    if (car) {
        res.status(400).json({ message: "Car already exists" });
    } else {
        const newCar = await CarsModel.create({ matricula, marca, modelo, id_typeCar });
        res.status(201).json(newCar);
    }
}



// get all cars
export const getAllCars = async (req, res) => {
    const cars = await CarsModel.findAll();
    res.status(200).json(cars);
}



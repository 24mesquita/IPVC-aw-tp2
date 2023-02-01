import Router from "express";
import {
    createCar,
    getAllCars,
} from "../controllers/cars.js";

const carRoutes = Router();

carRoutes.post("/createCar", createCar);

carRoutes.get("/getAllCars", getAllCars);

export { carRoutes };
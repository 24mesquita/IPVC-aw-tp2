import Router from "express";
import {
    createCar,
    getAllCars,
    updatePhoto,
    upload,
    deleteCar
} from "../controllers/cars.js";

const carRoutes = Router();

carRoutes.post("/createCar", createCar);

//carRoutes.get("/getAllCarsByType/:type", getAllCarsByType);

carRoutes.get("/getAllCars", getAllCars);

carRoutes.put("/updatePhoto/:id", upload, updatePhoto);

carRoutes.delete("/deleteCar/:id", deleteCar);


export { carRoutes };
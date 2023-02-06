import Router from "express";
import {
    createCar,
    getAllCars,
    updatePhoto,
    upload
} from "../controllers/cars.js";

const carRoutes = Router();

carRoutes.post("/createCar", createCar);

carRoutes.get("/getAllCars", getAllCars);

carRoutes.put("/updatePhoto/:id", upload, updatePhoto);

export { carRoutes };
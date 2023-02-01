import Router from "express";
import {
    createTypeCar,
} from "../controllers/typeCar.js"; 

const TypeCarRoutes = Router();

TypeCarRoutes.post("/createTypeCar", createTypeCar);



export { TypeCarRoutes };
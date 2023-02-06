import Router from "express";
import {
    createTypeCar,
    getAllTypeCars
} from "../controllers/typeCar.js"; 

const TypeCarRoutes = Router();

TypeCarRoutes.post("/createTypeCar", createTypeCar);
TypeCarRoutes.get("/getAllTypeCars", getAllTypeCars);



export { TypeCarRoutes };
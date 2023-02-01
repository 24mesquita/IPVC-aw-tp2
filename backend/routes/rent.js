import Router from "express";
import {
    createRent,
    
} from "../controllers/rent.js";

const rentRoutes = Router();

rentRoutes.post("/createRent", createRent);



export { rentRoutes };
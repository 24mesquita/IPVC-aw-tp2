import Router from "express";
import {
    createRent,
    getAllRents,
    getAllRentsUser,

} from "../controllers/rent.js";

const rentRoutes = Router();

rentRoutes.post("/createRent", createRent);
rentRoutes.get("/getAllRents", getAllRents);
rentRoutes.get("/getAllRentsUser/:id", getAllRentsUser);


export { rentRoutes };
import Router from "express";
import {
    createRent,
    getAllRents,
    getAllRentsUser,
    deleteRent,

} from "../controllers/rent.js";

const rentRoutes = Router();

rentRoutes.post("/createRent", createRent);
rentRoutes.get("/getAllRents", getAllRents);
rentRoutes.get("/getAllRentsUser/:id", getAllRentsUser);
rentRoutes.delete("/deleteRent/:id", deleteRent);   


export { rentRoutes };
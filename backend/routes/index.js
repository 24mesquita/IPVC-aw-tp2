import Router from "express";
import { userRoutes } from "./users.js";
import{ TypeCarRoutes } from "./typeCar.js";
import { carRoutes } from "./cars.js";
import { rentRoutes } from "./rent.js";


const routes = Router();

routes.use("/users", userRoutes);

routes.use("/cars", carRoutes);

routes.use("/rent", rentRoutes);

routes.use("/typeCar", TypeCarRoutes);

export { routes };
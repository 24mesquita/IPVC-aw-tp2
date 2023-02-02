import Router from "express";
import {
    createUser,
    getAllUsers,
    loginUser,
} from "../controllers/users.js";

const userRoutes = Router();

userRoutes.post("/createUser", createUser);

userRoutes.post("/loginUser", loginUser);

userRoutes.get("/getAllUsers", getAllUsers);

export { userRoutes };
import Router from "express";
import {
    createUser,
    getAllUsers,
    loginUser,
    createUser_admin,
    deleteUser
} from "../controllers/users.js";

const userRoutes = Router();

userRoutes.post("/createUser", createUser);

userRoutes.post("/createUser_admin", createUser_admin);

userRoutes.post("/loginUser", loginUser);

userRoutes.get("/getAllUsers", getAllUsers);


userRoutes.delete("/deleteUser/:id", deleteUser);


export { userRoutes };
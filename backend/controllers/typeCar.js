import { TypeCarModel  } from "../models/typeCar.js";

// create new typecar, verify if name already exists
export const createTypeCar = async (req, res) => {
    const { description } = req.body;
    const typeCar = await TypeCarModel.findOne({ where: { description } });
    if (typeCar) {
        res.status(400).json({ message: "TypeCar already exists" });
    } else {
        const newTypeCar = await TypeCarModel.create({ description });
        res.status(201).json(newTypeCar);
    }
}



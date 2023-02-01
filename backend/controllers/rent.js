import { RentModel} from "../models/rent.js";

// create new rent, verify if date related with id_car already exists
export const createRent = async (req, res) => {
    const { data, id_user, id_car } = req.body;
    const rent = await RentModel.findOne({ where: { data, id_car } });
    if (rent) {
        res.status(400).json({ message: "Rent already exists" });
    } else {
        const newRent = await RentModel.create({ data, id_user, id_car });
        res.status(201).json(newRent);
    }
}
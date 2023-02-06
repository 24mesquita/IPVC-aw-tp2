import { RentModel} from "../models/rent.js";


//create new rent verify if car is available
export const createRent = async (req, res) => {
    const { id_car, id_user, startDate, endDate } = req.body;
    
    // Check if the car is already rented in the specified dates
    const overlappingRent = await RentModel.findOne({
        id_car,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
    });
    if (overlappingRent) {
        return res.status(409).json({ message: "Car is not available in the specified dates" });
    }

    const rent = new RentModel({
        id_car,
        id_user,
        startDate,
        endDate,
    });
    try {
        const rentCreated = await rent.save();
        res.status(201).json(rentCreated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating rental record" });
    }
};





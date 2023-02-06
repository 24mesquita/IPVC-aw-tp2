import {CarsModel} from '../models/cars.js';
import {TypeCarModel} from '../models/typeCar.js';
import multer from 'multer';

// create new car, verify if matricula already exists
export const createCar = async (req, res) => {
    const { matricula, marca, modelo, id_typeCar } = req.body;
    const car = await CarsModel.findOne({ where: { matricula } });
    if (car) {
        res.status(400).json({ message: "Car already exists" });
    } else {
        const newCar = await CarsModel.create({ matricula, marca, modelo, id_typeCar });
        res.status(201).json(newCar);
    }
}



// get all cars
export const getAllCars = async (req, res) => {
        const cars = await CarsModel.findAll();
        res.status(200).json(cars);
        console.log(cars);
    }

// 2. Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})  






// 3. Set up multer to upload the image
export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('imagem')

//filter cars 
export const filterCars = async (req, res) => {
    const { marca, modelo, ano, cor, preco, id_typeCar } = req.body;
    const cars = await CarsModel.findAll({ where: { marca, modelo, ano, cor, preco, id_typeCar } });
    res.status(200).json(cars);
    console.log(cars);
}

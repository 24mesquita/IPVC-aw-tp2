import {CarsModel} from '../models/cars.js';
import {TypeCarModel} from '../models/typeCar.js';
import multer from 'multer';
import path from 'path'

// create newt car, verify if matricula already exists
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

// 

export const updatePhoto = async (req, res) => {
    try {
        const { id } = req.params
        const carExist = await CarsModel.findOne({ where: { id: id } })
        console.log('------------------' + req.file)
        if (carExist) {
            if (carExist.imagem !== 'default.png') {
                fs.unlinkSync(`uploads/${carExist.imagem}`)
            }
            await CarsModel.update({ imagem: req.file.filename }, { where: { id: id } })
            res.status(200).send({ message: 'Foto da viatura atualizada com sucesso' })
        } else {
            res.status(404).send({ message: 'User not found' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating profile picture', error: error.message });
    }
}




// get all cars
export const getAllCars = async (req, res) => {
        const cars = await CarsModel.findAll();
        res.status(200).json(cars);
        console.log(cars);
    }

//  Image Upload


//filter cars 
export const filterCars = async (req, res) => {
    const { marca, modelo, ano, cor, preco, id_typeCar } = req.body;
    const cars = await CarsModel.findAll({ where: { marca, modelo, ano, cor, preco, id_typeCar } });
    res.status(200).json(cars);
    console.log(cars);
}


// Set up storage engine for multer
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


// Set up multer to upload the image
export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        console.log('---------------------------' + file.originalname)

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('imagem')
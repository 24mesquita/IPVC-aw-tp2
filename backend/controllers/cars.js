import {CarsModel} from '../models/cars.js';
import {TypeCarModel} from '../models/typeCar.js';
import multer from 'multer';
import path from 'path'




// create newt car, verify if matricula already exists
export const createCar = async (req, res) => {
    try {
        const { matricula, marca, modelo, ano, cor, preco, typeCarId, sobre } = req.body;
        const carExist = await CarsModel.findOne({ where: { matricula: matricula } })
        if (carExist) {
            res.status(400).send({ message: 'Matricula já existe' })
        } else {
            const newCar = await CarsModel.create({ matricula, marca, modelo, ano, cor, preco, typeCarId, sobre}) 
            res.status(201).send({ message: 'Viatura criada com sucesso', newCar })
        }
    } catch (error) {   
        res.status(500).send({ message: 'Error creating car', error: error.message });
    }   
}

// delete car by id
export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const carExist = await CarsModel.findOne({ where: { id: id } })
        if (carExist) {
            await CarsModel.destroy({ where: { id: id } });
            res.status(200).send({ message: 'Viatura eliminada com sucesso' })
        } else {
            res.status(404).send({ message: 'Viatura não encontrada' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error deleting car', error: error.message });
    }
}




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




// get all cars from database if filter is empty, if not get cars by filter
export const getAllCars = async (req, res) => {
    try {
        const { tipo, marca, ano } = req.params
        let cars = await CarsModel.findAll({
            include: {
                model: TypeCarModel,
                as: 'typeCar'
            }
        });
        if (tipo) {
            cars = cars.filter(car => car.typeCarId === type);
        }
        if (marca) {
            cars = cars.filter(car => car.marca === marca);
        }
        if (ano) {
            cars = cars.filter(car => car.ano === ano);
        }
        res.status(200).send(cars)
    } catch (error) {
        res.status(500).send({ message: 'Error getting cars', error: error.message });
    }
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



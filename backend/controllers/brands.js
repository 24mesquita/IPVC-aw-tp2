  
import { BrandsModel } from '../models/brands.js';

//create new brand
export const createBrand = async (req, res) => {
    const { name } = req.body;
    const brand = await BrandsModel.findOne({ where: { name } });
    if (brand) {
        res.status(400).json('Esta marca já existe')
    } else {
        const newBrand = await BrandsModel.create({ name });
        res.status(201).json(newBrand);
    }
}

// get all brands
export const getAllBrands = async (req, res) => {
    const brands = await BrandsModel.findAll();
    res.status(200).json(brands);
}
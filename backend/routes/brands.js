import router   from 'express';
import { createBrand, getAllBrands } from '../controllers/brands.js';

const brandRoutes = router();

brandRoutes.post('/createBrand', createBrand);

brandRoutes.get('/getAllBrands', getAllBrands);

export { brandRoutes };


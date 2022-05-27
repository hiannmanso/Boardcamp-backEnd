import express from 'express';
import {
	GETcategories,
	POSTcategories,
} from '../Controllers/categoriesControllers.js';

const categoriesRouter = express.Router();

categoriesRouter.post('/categories', POSTcategories);
categoriesRouter.get('/categories', GETcategories);

export default categoriesRouter;

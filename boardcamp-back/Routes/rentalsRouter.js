import express from 'express'
import {
	DELETErentals,
	GETRentals,
	POSTrentals,
	PUTrentals,
} from '../Controllers/rentalsControllers.js'
import { valPutRental } from '../Middlewares/valPutRental.js'

const rentalsRouter = express.Router()

rentalsRouter.post('/rentals', POSTrentals)
rentalsRouter.get('/rentals', GETRentals)

rentalsRouter.put('/rentals', valPutRental, PUTrentals)

rentalsRouter.delete('/rentals', DELETErentals)

export default rentalsRouter

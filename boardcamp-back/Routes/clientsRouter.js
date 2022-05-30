import express from 'express'
import {
	GETclients,
	GetCustomersFromID,
	POSTclients,
	PUTclients,
} from '../Controllers/clientsControllers.js'
import validateClient from '../Middlewares/validateClient.js'

const clientsRouter = express.Router()

clientsRouter.post('/customers', validateClient, POSTclients)
clientsRouter.get('/customers', GETclients)
clientsRouter.get('/customers/:id', GetCustomersFromID)
clientsRouter.put('/customers/:id', validateClient, PUTclients)

export default clientsRouter

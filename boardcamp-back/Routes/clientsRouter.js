import express from 'express'
import {
	GETclients,
	POSTclients,
	PUTclients,
} from '../Controllers/clientsControllers.js'
import validateClient from '../Middlewares/validateClient.js'

const clientsRouter = express.Router()

clientsRouter.post('/customers', validateClient, POSTclients)
clientsRouter.get('/customers', GETclients)
clientsRouter.put('/customers/:id', validateClient, PUTclients)

export default clientsRouter

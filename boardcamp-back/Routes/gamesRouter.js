import express from 'express'
import { GETgames, POSTgames } from '../Controllers/gamesControllers.js'
import validateCategoryId from '../Middlewares/validateCategoryId.js'

const gamesRouter = express.Router()

gamesRouter.post('/games', POSTgames)
gamesRouter.get('/games', GETgames)

export default gamesRouter

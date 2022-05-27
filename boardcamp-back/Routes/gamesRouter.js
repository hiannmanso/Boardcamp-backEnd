import express from 'express'
import { GETgames, POSTgames } from '../Controllers/gamesControllers.js'

const gamesRouter = express.Router()

gamesRouter.post('/games', POSTgames)
gamesRouter.get('/games', GETgames)

export default gamesRouter

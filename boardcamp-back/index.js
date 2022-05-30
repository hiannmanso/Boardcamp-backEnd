import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import dotenv from 'dotenv'
import categoriesRouter from './Routes/categoriesRouter.js'
import gamesRouter from './Routes/gamesRouter.js'
import clientsRouter from './Routes/clientsRouter.js'
import rentalsRouter from './Routes/rentalsRouter.js'

dotenv.config()

const server = express()

server.use(cors())
server.use(express.json())

server.use(categoriesRouter)
server.use(gamesRouter)
server.use(clientsRouter)
server.use(rentalsRouter)

server.listen(process.env.PORT, () => {
	console.log(chalk.bold.green(`Backend up on port:${process.env.PORT}`))
})

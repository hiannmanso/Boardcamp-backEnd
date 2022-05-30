import { query } from 'express'
import db from '../database.js'

export async function POSTrentals(req, res) {
	const { customerId, gameId, daysRented } = req.body
	const dateNow = new Date()
	try {
		const getPricePerDayGame = `SELECT * FROM games WHERE id=$1`
		const infoPricePerDayGame = await db.query(getPricePerDayGame, [gameId])
		const originalPrice =
			Number(daysRented) * Number(infoPricePerDayGame.rows[0].pricePerDay)

		const query = `INSERT INTO rentals ("customerId","gameId","daysRented","rentDate","originalPrice","returnDate","delayFee") VALUES ($1,$2,$3,$4,$5,null,null)`
		await db.query(query, [
			customerId,
			gameId,
			daysRented,
			dateNow,
			originalPrice,
		])

		res.sendStatus(201)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}

export async function GETRentals(req, res) {
	try {
		const { customerId, gameId } = req.query

		const retalsList = await db.query(
			`SELECT  rentals.*,
					customers.id AS customer_id,
					customers.name AS customer_name,
					games.id AS game_id,
					games.name AS game_name,
					categories.id AS category_id,
					categories.name AS category_name FROM rentals 
			JOIN customers ON rentals."customerId" = customers.id 
			JOIN games ON rentals."gameId" = games.id 
			JOIN categories ON games."categoryId" = categories.id
			;`
		)

		let rentalsArray = retalsList.rows

		if (customerId) {
			console.log('aaa')
			rentalsArray = rentalsArray.filter(
				(obj) => obj.customerId === Number(customerId)
			)
		}
		if (gameId) {
			rentalsArray = rentalsArray.filter(
				(obj) => obj.gameId === Number(gameId)
			)
		}

		const infoGets = rentalsArray.map((obj) => ({
			id: obj.id,
			customerId: obj.customerId,
			gameId: obj.gameId,
			rentDate: obj.rentDate,
			daysRented: obj.daysRented,
			returnDate: obj.returnDate,
			originalPrice: obj.originalPrice,
			delayFee: obj.delayFee,
			customer: {
				id: obj.customer_id,
				name: obj.customer_name,
			},
			game: {
				id: obj.game_id,
				name: obj.game_name,
				categoryId: obj.category_id,
				categoryName: obj.category_name,
			},
		}))
		return res.send(infoGets)
	} catch (err) {
		console.log(err)
		return res.sendStatus(500)
	}
}

export async function PUTrentals(req, res) {
	const { id } = req.params
	const data = req.body
	const date = new Date()
	let time = new Date(data.rentDate)
	try {
		const rightDay = time.setDate(time.getDate() + data.daysRented)
		let delayFee = 0
		if (date > rightDay) {
			const totalDays = Math.ceil((date - rightDay) / (1000 * 3600 * 24))
			delayFee = totalDays * (data.originalPrice / data.daysRented)
		}
		const devolution =
			date.getFullYear() +
			'-' +
			(date.getMonth() + 1) +
			'-' +
			date.getDate()
		await db.query(
			`
            UPDATE rentals
            SET "customerId" = $1, "gameId" = $2, "daysRented" = $3, "rentDate" = $4, "originalPrice" = $5, "returnDate" = $6, "delayFee" = $7
            WHERE id = $8
        `,
			[
				data.customerId,
				data.gameId,
				data.daysRented,
				data.rentDate,
				data.originalPrice,
				devolution,
				delayFee,
				id,
			]
		)
		res.sendStatus(200)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

export async function DELETErentals(req, res) {
	const { id } = req.body
	try {
		const verifyID = `SELECT * FROM rentals WHERE id = $1`
		const verificationID = await db.query(verifyID, [id])
		if (verificationID.rowCount === 0) return res.sendStatus(404)
		if (verificationID.rows[0].returnDate) return res.status(400)

		const deleteItem = `DELETE FROM rentals WHERE id =$1`
		const deleteRental = await db.query(deleteItem, [id])
		res.status(200).send(deleteRental)
	} catch (error) {}
}

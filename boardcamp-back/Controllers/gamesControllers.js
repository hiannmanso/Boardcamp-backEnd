import db from '../database.js'

export async function POSTgames(req, res) {
	const { name, image, stockTotal, categoryId, pricePerDay } = req.body
	try {
		//COLOCAR ESSA PORRA EM UM MIDDLEWARE PQ TA FEIO!
		// VERIFICAÇÃO POR JOI A IMPLEMENTAR
		if (!name || stockTotal <= 0 || pricePerDay <= 0) {
			return res.sendStatus(400)
		}
		const verifyCategoryId = `SELECT * FROM categories WHERE id = $1`
		const verificationID = await db.query(verifyCategoryId, [categoryId])
		if (verificationID.rowCount === 0) {
			return res
				.status(400)
				.send('categoryId must be an existing category ID')
		}
		const verifyName = `SELECT * FROM games WHERE name = $1`
		const verificationName = await db.query(verifyName, [name])
		if (verificationName.rowCount != 0) {
			return res
				.status(409)
				.send('cannot be an already existing category name')
		}
		const query = `INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES($1,$2,$3,$4,$5)`
		await db.query(query, [
			name,
			image,
			stockTotal,
			categoryId,
			pricePerDay,
		])
		res.sendStatus(201)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}

export async function GETgames(req, res) {
	try {
		const query = `SELECT games.*, categories.name as categoryName FROM games JOIN categories ON games."categoryId" = categories.id`

		const listGames = await db.query(query)
		res.send(listGames.rows)
	} catch (error) {}
}

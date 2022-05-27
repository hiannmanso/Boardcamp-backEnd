import db from '../database.js'

export async function POSTcategories(req, res) {
	const { name } = req.body

	try {
		if (!name) return res.status(400).send('name cannot be empty')

		const verify = `SELECT * FROM categories WHERE name = $1`
		const verification = await db.query(verify, [name])
		if (verification.rowCount != 0) {
			return res
				.status(409)
				.send('cannot be an already existing category name')
		}
		const query = `INSERT INTO categories (name) VALUES ($1)`
		await db.query(query, [name])
		res.sendStatus(201)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}
export async function GETcategories(req, res) {
	try {
		const query = `SELECT * FROM categories`
		const categories = await db.query(query)
		res.status(200).send(categories.rows)
	} catch (error) {}
	res.status(400).send(error)
}

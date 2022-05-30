export async function valPutRental(req, res, next) {
	const data = req.body
	const { id } = req.params
	try {
		const testId = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
			id,
		])

		if (!testId.rows[0]) {
			return res.sendStatus(404)
		}

		if (testId.rows[0].returnDate) {
			return res.sendStatus(400)
		}

		next()
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

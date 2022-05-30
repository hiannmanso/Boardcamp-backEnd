export default async function validateCategoryId(req, res, next) {
	const { categoryId } = req.body
	const verifyCategoryId = `SELECT * FROM categories WHERE id = $1`
	const verificationID = await db.query(verifyCategoryId, [categoryId])
	if (verificationID.rowCount === 0) {
		return res
			.status(400)
			.send('categoryId must be an existing category ID')
	}
	next()
}

import joi from 'joi'

export default function validateClient(req, res, next) {
	const { name, phone, birthday, cpf } = req.body

	const ClientSchema = joi.object({
		name: joi
			.string()
			.pattern(/[a-zA-ZãÃÇ-Üá-ú0-9]*/)
			.required(),
		phone: joi
			.string()
			.pattern(/[0-9]{10,11}/)
			.required(),
		birthday: joi
			.string()
			.pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
			.required(),
		cpf: joi
			.string()
			.pattern(/[0-9]{11}/)
			.required(),
	})
	const clientInfo = { name, phone, birthday, cpf }
	const validation = ClientSchema.validate(clientInfo)
	if (validation.error) {
		return res.status(400).send(validation.error)
	}
	next()
}

import db from '../database.js'

export async function POSTclients(req, res) {
	const { name, phone, cpf, birthday } = req.body
	try {
		const verifyCpf = `SELECT * FROM customers WHERE cpf = $1`
		const verificationCpf = await db.query(verifyCpf, [cpf])
		if (verificationCpf.rowCount !== 0) {
			return res
				.status(409)
				.send('CPF already registered in the database')
		}

		const query = `INSERT INTO customers ( name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`
		await db.query(query, [name, phone, cpf, birthday])

		res.sendStatus(201)
	} catch (error) {
		console.log(error)
		res.status(402).send(error)
	}
}

export async function GETclients(req, res) {
	const { cpf } = req.query
	let clientsInfo = {}
	try {
		if (cpf) {
			const query = `SELECT * FROM customers WHERE cpf LIKE $1`
			clientsInfo = await db.query(query, [`${cpf}%`])
		} else {
			const query = `SELECT * FROM customers`
			clientsInfo = await db.query(query)
		}
		res.send(clientsInfo.rows)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}

export async function PUTclients(req, res) {
	const { id } = req.params
	const { name, cpf, birthday, phone } = req.body

	try {
		const verifyCpf = `SELECT * FROM customers WHERE cpf = $1`
		const verificationCpf = await db.query(verifyCpf, [cpf])
		if (verificationCpf.rowCount !== 0) {
			return res
				.status(409)
				.send('CPF already registered in the database')
		}

		const query = `UPDATE customers SET name=$1,cpf=$2,birthday=$3,phone=$4 WHERE id= $5`
		const editClient = await db.query(query, [
			name,
			cpf,
			birthday,
			phone,
			id,
		])

		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}

export async function GetCustomersFromID(req, res) {
	const { id } = req.params
	try {
		const query = `SELECT * FROM customers WHERE id =$1`
		const customer = db.query(query, [id])
		if (!customer.rowCount === 0) return res.sendStatus(404)
		res.status(200).send(customer.rows)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}

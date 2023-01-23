import express from 'express';
import { v4 as uuidV4 } from 'uuid';

const PORT = 3333;
const app = express();
app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
	const { cpf, name } = request.body;

	const accountAlreadyExists = customers.some(
		(customer) => customer.cpf === cpf,
	);

	if (accountAlreadyExists) {
		return response.status(400).json({ message: 'Account already exists' });
	}

	const account = {
		id: uuidV4(),
		cpf,
		name,
		statement: [],
	};

	customers.push(account);

	return response.status(201).json({ account });
});

app.get('/statement/:cpf', (request, response) => {
	const { cpf } = request.params;

	const customer = customers.find((customer) => customer.cpf === cpf);

	if (!customer) {
		return response.status(404).json({ message: 'Customer not found' });
	}

	return response.json({ customer: customer.statement });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

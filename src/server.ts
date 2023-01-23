import express, { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

const PORT = 3333;
const app = express();
app.use(express.json());

interface ICustomer {
	id: string;
	cpf: string;
	name: string;
	statement: {
		description: string;
		amount: number;
		type: 'credit' | 'debit'; // deposit
		created_at: Date;
	}[];
}

const customers: ICustomer[] = [];

function verifyAccountIfExistsWithCPF(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const { cpf } = request.headers;

	const customer = customers.find((customer) => customer.cpf === cpf);

	if (!customer) {
		return response.status(400).json({ message: 'Customer not found' });
	}

	request.customer = customer;
	return next();
}

app.post('/account', (request, response) => {
	const { cpf, name } = request.body;

	const accountAlreadyExists = customers.some(
		(customer) => customer.cpf === cpf,
	);

	if (accountAlreadyExists) {
		return response.status(400).json({ message: 'Account already exists' });
	}

	const account: ICustomer = {
		id: uuidV4(),
		cpf,
		name,
		statement: [],
	};

	customers.push(account);

	return response.status(201).json({ account });
});

app.get('/statement', verifyAccountIfExistsWithCPF, (request, response) => {
	const { customer } = request;
	return response.json({ customer: customer.statement });
});

app.post('/deposit', verifyAccountIfExistsWithCPF, (request, response) => {
	const { customer } = request;
	const { description, amount } = request.body;

	const operation = {
		description,
		amount,
		type: 'credit', // deposit
		created_at: new Date(),
	};

	customer.statement.push(operation);

	return response.status(201).send();
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

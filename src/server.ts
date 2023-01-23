/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import express, { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

const PORT = 3333;
const app = express();
app.use(express.json());

interface IStatement {
	description: string;
	amount: number;
	type: 'credit' | 'debit'; // deposit
	created_at: Date;
}

interface ICustomer {
	id: string;
	cpf: string;
	name: string;
	statement: IStatement[];
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

function getBalance(statement: IStatement[]) {
	const balance = statement.reduce((acc: number, operation: IStatement) => {
		if (operation.type === 'credit') {
			return (acc += operation.amount);
		}
		return (acc -= operation.amount);
	}, 0);
	return balance;
}

app.post('/account', (request, response): Response => {
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

	return response.status(201).send();
});

app.get(
	'/statement',
	verifyAccountIfExistsWithCPF,
	(request, response): Response => {
		const { customer } = request;
		return response.json({ customer: customer.statement });
	},
);

app.post(
	'/deposit',
	verifyAccountIfExistsWithCPF,
	(request, response): Response => {
		const { customer } = request;
		const { description, amount } = request.body;

		customer.statement.push({
			description,
			amount,
			type: 'credit', // deposit
			created_at: new Date(),
		});

		return response.status(201).send();
	},
);

app.post(
	'/withdraw',
	verifyAccountIfExistsWithCPF,
	(request, response): Response => {
		const { customer } = request;
		const { amount, description } = request.body;

		const { statement } = customer;

		const balance = getBalance(statement);

		if (balance < amount) {
			return response.status(400).json({ message: 'Insufficient funds' });
		}

		customer.statement.push({
			description,
			amount,
			type: 'debit', // deposit
			created_at: new Date(),
		});

		return response.status(201).send();
	},
);

app.get(
	'/statement/date',
	verifyAccountIfExistsWithCPF,
	(request, response): Response => {
		const { date } = request.query;
		const { customer } = request;

		const dateFormatted = new Date(`${date} 00:00`);

		const statement = customer.statement.filter(
			(statement) =>
				statement.created_at.toDateString() === dateFormatted.toDateString(),
		);

		return response.json(statement);
	},
);

app.put('/account', verifyAccountIfExistsWithCPF, (request, response) => {
	const { customer } = request;
	const { name } = request.body;

	customer.name = name;
	return response.status(201).send();
});

app.get('/account', verifyAccountIfExistsWithCPF, (request, response) => {
	const { customer } = request;
	return response.json(customer);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

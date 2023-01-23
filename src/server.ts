import express from 'express';
import { v4 as uuidV4 } from 'uuid';

const PORT = 3333;
const app = express();
app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
	const { cpf, name } = request.body;

	const account = {
		id: uuidV4(),
		cpf,
		name,
		statement: [],
	};

	customers.push(account);

	return response.status(201).json({ account });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

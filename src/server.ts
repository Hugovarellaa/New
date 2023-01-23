import express from 'express';

const PORT = 3333;
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World! ok');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

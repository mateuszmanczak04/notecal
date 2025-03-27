import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: process.env.NODE_ENV === 'production' ? 'https://app.notecal.app' : 'http://localhost:5173',
		credentials: true,
	}),
);

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authenticated = true;
	if (!authenticated) {
		res.status(401).end();
		return;
	}
	next();
};

app.get('/api', authMiddleware, (req, res) => {
	res.send('Hello World!');
});

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
	res.status(500).json({ error: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

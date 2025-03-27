import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: process.env.NODE_ENV === 'production' ? 'https://app.notecal.app' : 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/api', authMiddleware, async (req, res) => {
	console.log(req.user);
	res.send('hello world');
});

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
	res.status(500).json({ error: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

import express, { type NextFunction, type Request, type Response } from 'express';
const app = express();

const authMiddleware = (_req: Request, res: Response, next: NextFunction) => {
	const authenticated = true;
	if (!authenticated) {
		res.status(401).end()
        return
	}
	next();
};


app.get('/api', authMiddleware, (req, res) => {
	res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

import type { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
	console.log('user', req.user);
	res.status(200).json({ user: req.user });
};

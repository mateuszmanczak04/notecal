import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const decoded = await verifyToken(req.cookies.authToken);

	if (!decoded) {
		res.clearCookie('authToken');
		res.status(401).end();
		return;
	}

	next();
};

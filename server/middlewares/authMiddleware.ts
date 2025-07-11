import type { NextFunction, Request, Response } from 'express';
import db from '../prisma/db';
import { verifyToken } from '../services/jwtService';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const decoded = await verifyToken(req.cookies.authToken);

	if (!decoded) {
		res.status(401).end();
		return;
	}

	const user = await db.user.findUnique({
		where: {
			id: decoded.id,
		},
	});

	if (!user) {
		res.status(401).end();
		return;
	}

	req.user = user;

	next();
};

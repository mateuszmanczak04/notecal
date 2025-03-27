import type { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
	res.status(200).json({ user: req.user });
};

export const updateEmail = async (req: Request, res: Response) => {};
export const updatePassword = async (req: Request, res: Response) => {};

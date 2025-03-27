import { Router } from 'express';
import {
	createNote,
	deleteNote,
	duplicateNote,
	exportNote,
	getNote,
	getNotes,
	updateNote,
} from '../controllers/noteController';

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.post('/:id/export', exportNote);
router.post('/:id/duplicate', duplicateNote);

export default router;

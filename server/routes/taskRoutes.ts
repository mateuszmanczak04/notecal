import { Router } from 'express';
import { createTask, deleteTask, getTasks, sortTasks, updateTask } from '../controllers/taskController';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/sort', sortTasks);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);

export default router;

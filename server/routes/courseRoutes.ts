import { Router } from 'express';
import { createCourse, deleteCourse, getCourses, updateCourse } from '../controllers/courseController';

const router = Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;

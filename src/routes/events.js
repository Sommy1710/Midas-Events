import {Router} from 'express';
import authorizationMiddleware from '../app/middleware/authorization.middleware.js';
import authMiddleware from '../app/middleware/auth.middleware.js';
import { createNewEvent, deleteSingleEvent, fetchAllEvents, fetchEvent, updateSingleEvent } from '../app/controllers/event.controller.js';
const router = Router();

router.get('/', authMiddleware, fetchAllEvents);
router.post('/', authMiddleware, authorizationMiddleware, createNewEvent);
router.get('/:id', authMiddleware, fetchEvent);
router.put("/:id", authMiddleware, authorizationMiddleware, updateSingleEvent);
router.delete("/:id", authMiddleware, authorizationMiddleware, deleteSingleEvent);

export const eventsRouter = router;
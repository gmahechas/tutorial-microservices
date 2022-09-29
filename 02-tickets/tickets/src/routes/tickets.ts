import express, { Request, Response } from 'express';
import { requireAuthMiddleware, validateRequestMiddleware } from '@gmahechas/common-ms';
import { body } from 'express-validator';
import * as fromTicketController from './../controllers/tickets.controller'

const router = express.Router();

router.post('/api/tickets',
  requireAuthMiddleware,
  [
    body('title').not().isEmpty().withMessage('Title is Require'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ],
  validateRequestMiddleware,
  fromTicketController.tickets
);

router.post('/api/tickets/:id',
  fromTicketController.ticket
);

router.get('/api/tickets',
  fromTicketController.getTickets
);

router.put('/api/tickets/:id',
  requireAuthMiddleware,
  [
    body('title').not().isEmpty().withMessage('Title is Require'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ],
  validateRequestMiddleware,
  fromTicketController.update
);

export { router as ticketsRouter };
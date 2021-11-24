import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import { requireAuthMiddleware, validateRequestMiddleware, NotFountError, BadRequestError, NotAuthorizedError } from '@gmahechas/common-ms';
import { Ticket } from '../models/ticket';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post('/api/orders', requireAuthMiddleware,
  [
    body('ticketId').not().isEmpty().custom((input: string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Title is Require')
  ],
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFountError();
    }

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket
    });

    await order.save();

    res.status(201).send(order);
  });

router.get('/api/orders', requireAuthMiddleware, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');
  res.send(orders);
});

router.get('/api/orders/:orderId', requireAuthMiddleware, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate('ticket');
  if(!order) {
    throw new NotFountError();
  }
  if(order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  res.send(order);
});

router.delete('/api/orders/:orderId', requireAuthMiddleware, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if(!order) { 
    throw new NotFountError();
  }

  if(order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();
  res.send(order);
});


export { router as ordersRouter };
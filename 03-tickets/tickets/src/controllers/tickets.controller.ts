import { NotAuthorizedError, NotFountError } from '@gmahechas/common-ms';
import { Request, Response } from 'express';

import { Ticket } from '../databases/mongodb/ticket';

export const tickets = async (req: Request, res: Response) => {
  const { title, price } = req.body;

  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id
  })

  await ticket.save();

  res.status(201).send(ticket);
}

export const ticket = async (req: Request, res: Response) => {

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    throw new NotFountError();
  }

  res.send(ticket);
}

export const getTickets = async (req: Request, res: Response) => {

  const tickets = await Ticket.find({});

  res.send(tickets);
}

export const update = async (req: Request, res: Response) => {

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    throw new NotFountError();
  }

  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price
  });
  await ticket.save();

  res.send(ticket);
}
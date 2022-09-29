import {  Publisher, Subjects, TicketCreatedEvent } from '@gmahechas/common-ms';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
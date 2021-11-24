import { Publisher, Subjects, TicketUpdatedEvent } from '@gmahechas/common-ms';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
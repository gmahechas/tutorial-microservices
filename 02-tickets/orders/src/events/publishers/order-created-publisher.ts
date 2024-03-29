import { Publisher, Subjects, OrderCreatedEvent } from '@gmahechas/common-ms';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

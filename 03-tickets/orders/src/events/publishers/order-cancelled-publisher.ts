import { Publisher, Subjects, OrderCancelledEvent } from '@gmahechas/common-ms';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

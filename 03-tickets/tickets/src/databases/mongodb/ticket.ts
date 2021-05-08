import mongoose from 'mongoose';

// 1
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// 2
export interface TicketDocument extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// 3
interface TicketModel extends mongoose.Model<TicketDocument> {
  build(attrs: TicketAttrs): TicketDocument;
}

// 4
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

// 5
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// 6
const Ticket = mongoose.model<TicketDocument, TicketModel>('Ticket', ticketSchema);

export { Ticket };
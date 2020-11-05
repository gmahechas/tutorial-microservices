import mongoose from 'mongoose';
import { Password } from '../../utils/password';

// 3. An interface that describes the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// 6. an intreface that describes the properties that a user document has
export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

// 5. An interface that describes the properties that model has
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

// 1
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
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
        delete ret.password;
      }
    }
  }
);

// 7.
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// 4
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// 2
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
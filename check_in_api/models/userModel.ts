import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  name: String;
  checkIn: Date;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  checkIn: {
    type: Date,
    required: true,
  }
});

export default mongoose.model<IUser>("UserModel", userSchema);
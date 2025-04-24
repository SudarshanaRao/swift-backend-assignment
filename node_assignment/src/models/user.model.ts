import mongoose, { Schema, Document } from "mongoose";

// Address Schema
const AddressSchema = new Schema({
  street: { type: String, required: true },
  suite: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
});

// Company Schema
const CompanySchema = new Schema({
  name: { type: String, required: true },
  catchPhrase: { type: String, required: true },
  bs: { type: String, required: true },
});

// User Schema
export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  posts: mongoose.Types.ObjectId[]; 
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: AddressSchema,
  phone: { type: String, required: true },
  website: { type: String, required: true },
  company: CompanySchema,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

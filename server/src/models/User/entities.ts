import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  city: string;
  country: string;
  state: string;
  occupation: string;
  phoneNumber: string;
  role: "user" | "admin" | "superadmin";
}

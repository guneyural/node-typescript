import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "./user.model";

export async function createUser(
  user: Omit<
    DocumentDefinition<UserDocument>,
    "createdAt" | "updatedAt" | "comparePassword"
  >
) {
  return UserModel.create(user);
}

export async function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

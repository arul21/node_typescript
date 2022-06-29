import { FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import UserModel, { UserDocument, UserInput } from '../models/user.model';

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await UserModel.findOne({ email }).select(
      'name email role password',
    );
    if (!user) {
      return false;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
};

export const registerUser = async (input: UserInput) => {
  try {
    const response = await UserModel.create(input);
    return omit(response.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
};

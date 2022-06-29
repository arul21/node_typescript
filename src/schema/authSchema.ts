import { object, string } from 'zod';

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export const registerSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    // institution: string({
    //   required_error: 'Institution is required',
    // }),
    role: string({
      required_error: 'Role is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Name is required',
    }).min(5, 'Password too short - should be 6 chars minimum'),
  }),
});

import * as z from "zod";

const Email = z
  .object({
    email: z.email(
      "Email address is invalid. Make sure that it's in the following format: example@email.com"
    ),
  })
  .required();

const Name = z
  .object({
    name: z.string().min(2, "The name must be at least 2 letters long"),
  })
  .required();

interface IAuth {
  email: string;
  password: string;
  name: string;
  isEmailStepDone: boolean;
  isPasswordStepDone: boolean;
  isNameStepDone: boolean;
  isSuccessfullyRegistered: boolean;
}

export type IEmail = z.infer<typeof Email>;
export type IName = z.infer<typeof Name>;
export { Email, Name };
export type { IAuth };

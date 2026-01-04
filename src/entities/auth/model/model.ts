import * as z from "zod";

const Email = z
  .object({
    email: z.email(
      "Email address is invalid. Make sure that it's in the following format: example@email.com"
    ),
  })
  .required();

interface IAuth {
  email: string;
  isNextStep: boolean;
}

export type IEmail = z.infer<typeof Email>;
export { Email };
export type { IAuth };

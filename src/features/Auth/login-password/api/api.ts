import { api } from "../../../../shared/api/api";
import type { ILogin } from "../../../../entities/login/model/model";

type IUser = Pick<ILogin, "email" | "password">;

async function login(email: string, password: string): Promise<JSON> {
  return await api<JSON, IUser>("/auth/login/authorize", "POST", {
    email,
    password,
  });
}

export { login };

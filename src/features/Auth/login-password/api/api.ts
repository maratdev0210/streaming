import { api } from "../../../../shared/api/api";
import type { ILogin } from "../../../../entities/login/model/model";
import type { ILoginResponse } from "../model/model";

type IUser = Pick<ILogin, "email" | "password">;

async function login(email: string, password: string): Promise<ILoginResponse> {
  return await api<ILoginResponse, IUser>("/auth/login/authorize", "POST", {
    email,
    password,
  });
}

export { login };

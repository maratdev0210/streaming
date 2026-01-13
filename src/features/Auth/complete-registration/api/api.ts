import type { IAuth } from "../../../../entities/auth/model/model";
import { api } from "../../../../shared/api/api";
import type { IAuthResponse } from "../model/model";

type User = Pick<IAuth, "password" | "email" | "name">;

async function createUserAccount(data: User): Promise<IAuthResponse> {
  return await api<IAuthResponse, User>(
    "/auth/register/createUser",
    "POST",
    data
  );
}

export { createUserAccount };

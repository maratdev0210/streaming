import type { IAuth } from "../../../../entities/auth/model/model";
import { api } from "../../../../shared/api/api";

type User = Pick<IAuth, "password" | "email" | "name">;

async function createUserAccount(data: User): Promise<JSON> {
  return await api<JSON, User>("/auth/register/createUser", "POST", data);
}

export { createUserAccount };

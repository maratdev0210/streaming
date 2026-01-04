import { api } from "../../../../shared/api/api";
import type { IEmail } from "../../../../entities/auth/model/model";
import type { ICreateEmailResponse } from "../model/model";

async function checkEmailExists(email: IEmail): Promise<ICreateEmailResponse> {
  return await api<ICreateEmailResponse, IEmail>(
    "/auth/register/checkEmail",
    "POST",
    email
  );
}

export { checkEmailExists };

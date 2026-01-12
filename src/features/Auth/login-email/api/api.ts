import { api } from "../../../../shared/api/api";
import type { ILoginEmailResponse } from "../model/model";

async function checkEmailExists(email: string): Promise<ILoginEmailResponse> {
  type IEmail = { email: string };

  return await api<ILoginEmailResponse, IEmail>(
    "/auth/login/checkEmail",
    "POST",
    { email }
  );
}

export { checkEmailExists };

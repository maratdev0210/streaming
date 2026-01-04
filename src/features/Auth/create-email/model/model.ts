interface ICreateEmailResponse {
  message: string;
  status: "fullfilled" | "denied";
}

export type { ICreateEmailResponse };

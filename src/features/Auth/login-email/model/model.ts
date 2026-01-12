interface ILoginEmailResponse {
  message: string;
  status: "fullfilled" | "denied";
}

export type { ILoginEmailResponse };

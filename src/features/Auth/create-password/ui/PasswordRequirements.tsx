import { SuccessIcon, ErrorIcon } from "./Icons";

type Params = {
  password: string;
  label: string;
  testFunction: (password: string) => boolean;
};

export function PasswordRequirements({
  password,
  label,
  testFunction,
}: Params) {
  return (
    <li className="flex items-center mt-2 text-white">
      {testFunction(password) ? <SuccessIcon /> : <ErrorIcon />}
      <span
        className={`ml-2 text-sm ${testFunction(password) ? "text-white" : "text-[#f3727f]"}`}
      >
        {label}
      </span>
    </li>
  );
}
